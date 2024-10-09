import { db } from '$lib/server/db';
import { QuestionOptions, SurveyTable, surveyqnsTableV2 } from '$lib/server/schema';
import { eq, asc, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { addSurveyQuestionsv2 } from '$lib/server/db_utils';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError, z } from 'zod';

const checkZodSchema = z.object({
	question: z
		.string({ required_error: 'Question is required' })
		.min(10, { message: 'Please add a question' })
		.max(500, { message: 'Your question is too long' }),
	option: z
		.string({ required_error: 'Option is required' })
		.min(2, { message: 'Option cannot be blank' })
		.max(500, { message: 'Your option is too long' })
		.array()
});
const radioZodSchema = z.object({
	radio_question: z
		.string({ required_error: 'Question is required' })
		.min(10, { message: 'Please add a question' })
		.max(500, { message: 'Your question is too long' }),
	radio_option: z
		.string({ required_error: 'Option is required' })
		.min(2, { message: 'Option cannot be blank' })
		.max(500, { message: 'Your option is too long' })
		.array()
});
const rankZodSchema = z.object({
	rnk_question: z
		.string({ required_error: 'Question is required' })
		.min(10, { message: 'Please add a question' })
		.max(500, { message: 'Your question is too long' }),
	rnk_option: z
		.string({ required_error: 'Option is required' })
		.min(2, { message: 'Option cannot be blank' })
		.max(500, { message: 'Your option is too long' })
		.array()
		.min(5, {
			message: 'Ranking questions must have a minimum of 5 questions'
		})
});

const editZodSchema = z.object({
	option: z
		.string({ required_error: 'Answer is required' })
		.min(2, { message: 'Answer must have atleast 2 characters' })
		.max(500, { message: 'Answer must have a maximum 500 characters' }),
	id: z
		.string({ required_error: 'Answer is required' })
		.min(2, { message: 'Answer must have atleast 2 characters' })
		.max(500, { message: 'Answer must have a maximum 500 characters' })
});
const singleZosSchema = z.object({
	single_question: z
		.string({ required_error: 'Question is required' })
		.min(10, { message: 'Please add a question' })
		.max(500, { message: 'Your question is too long' })
});
const rateZosSchema = z.object({
	rating_question: z
		.string({ required_error: 'Question is required' })
		.min(10, { message: 'Please add a question' })
		.max(500, { message: 'Your question is too long' })
});

const likertZodSchema = z.object({
	question: z
		.string({ required_error: 'Question is required' })
		.min(10, { message: 'Please add a question' })
		.max(500, { message: 'Your question is too long' }),
	target: z
		.string({ required_error: 'Question is required' })
		.min(2, { message: 'Please add a question' })
		.max(500, { message: 'Your question is too long' })
});

export const load: PageServerLoad = async ({ params, locals: { user } }) => {
	const [data] = await db
		.select({
			title: SurveyTable.surveyTitle,
			desc: SurveyTable.surveyDescription
		})
		.from(SurveyTable)
		.where(
			sql`${SurveyTable.surveyid} = ${params.surveyid} and ${SurveyTable.clientid} = ${user?.id}`
		);

	const questions = await db
		.select({
			id: surveyqnsTableV2.questionId,
			question: surveyqnsTableV2.question,
			question_type: surveyqnsTableV2.questionT,
			likert_key: surveyqnsTableV2.likertKey,
			optionid: sql<string[]>`ARRAY_AGG(${QuestionOptions.optionId}) AS optionid`,
			options: sql<string[]>`ARRAY_AGG(${QuestionOptions.option}) AS options`
		})
		.from(surveyqnsTableV2)
		.leftJoin(QuestionOptions, eq(surveyqnsTableV2.questionId, QuestionOptions.questionId))
		.where(eq(surveyqnsTableV2.surveid, params.surveyid))
		.groupBy(surveyqnsTableV2.questionId, surveyqnsTableV2.question)
		.orderBy(asc(surveyqnsTableV2.updatedAt));

	return {
		surveydata: data,
		surveyqns: questions
	};
};

export const actions: Actions = {
	addSingleQns: async ({ request, params }) => {
		type Entry = {
			single_question: string;
		};
		const data = Object.fromEntries(await request.formData()) as Entry;

		try {
			const { single_question } = singleZosSchema.parse(data);
			await addSurveyQuestionsv2({
				surveid: params.surveyid,
				question: single_question
			});
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(400, {
					errors
				});
			} else {
				console.error(err);
			}
		}
		redirect(302, `/client-dash/surveys/questionnaire/${params.surveyid}`);
	},

	addMultiQns: async ({ request, params }) => {
		const data = await request.formData();
		let uuid = crypto.randomUUID();
		const construct = {
			question: data.get('question'),
			option: data.getAll('option')
		};

		try {
			// Validate and insert the question once

			const { question, option } = checkZodSchema.parse(construct);

			const options = option.map((item) => ({
				questionId: uuid,
				option: item
			}));
			await db.insert(surveyqnsTableV2).values({
				questionId: uuid,
				surveid: params.surveyid,
				questionT: 'Multiple',
				question: question
			});

			// Insert each unique option for the question
			await db.insert(QuestionOptions).values(options);
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(400, {
					errors
				});
			} else {
				console.error(err);
			}
		}
		redirect(302, `/client-dash/surveys/questionnaire/${params.surveyid}`);
	},

	addOptQns: async ({ request, params }) => {
		const data = await request.formData();
		const construct = {
			radio_question: data.get('radio_question'),
			radio_option: data.getAll('radio_option')
		};
		const quid = crypto.randomUUID();

		try {
			// Validate and insert the question once
			const { radio_question, radio_option } = radioZodSchema.parse(construct);

			const options = radio_option.map((item) => ({
				questionId: quid,
				option: item
			}));
			await db.insert(surveyqnsTableV2).values({
				questionId: quid,
				surveid: params.surveyid,
				questionT: 'Optional',
				question: radio_question
			});
			// Insert the option
			await db.insert(QuestionOptions).values(options);
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(400, {
					errors
				});
			} else {
				console.error(err);
			}
		}
		redirect(302, `/client-dash/surveys/questionnaire/${params.surveyid}`);
	},
	addStarQns: async ({ request, params }) => {
		type Entry = {
			rating_question: string;
		};
		const data = Object.fromEntries(await request.formData()) as Entry;

		try {
			const { rating_question } = rateZosSchema.parse(data);
			await addSurveyQuestionsv2({
				surveid: params.surveyid,
				questionT: 'Rating',
				question: rating_question
			});
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(400, {
					errors
				});
			} else {
				console.error(err);
			}
		}
		redirect(302, `/client-dash/surveys/questionnaire/${params.surveyid}`);
	},
	addLikQns: async ({ request, params }) => {
		type Entry = {
			question: string;
			target: string;
		};
		const data = Object.fromEntries(await request.formData()) as Entry;

		try {
			const { question, target } = likertZodSchema
				.partial({
					target: true
				})
				.parse(data);
			await addSurveyQuestionsv2({
				surveid: params.surveyid,
				questionT: 'Likert',
				question: question,
				likertKey: target
			});
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(400, {
					errors
				});
			} else {
				console.error(err);
			}
		}
		redirect(302, `/client-dash/surveys/questionnaire/${params.surveyid}`);
	},
	addRnkQns: async ({ request, params }) => {
		const data = await request.formData();
		const construct = {
			rnk_question: data.get('rnk_question'),
			rnk_option: data.getAll('rnk_option')
		};
		const quid = crypto.randomUUID();

		try {
			// Validate and insert the question once
			const { rnk_question, rnk_option } = rankZodSchema.parse(construct);

			const options = rnk_option.map((item) => ({
				questionId: quid,
				option: item
			}));
			await db.insert(surveyqnsTableV2).values({
				questionId: quid,
				surveid: params.surveyid,
				questionT: 'Ranking',
				question: rnk_question
			});
			// Insert the option
			await db.insert(QuestionOptions).values(options);
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(400, {
					errors
				});
			} else {
				console.error(err);
			}
		}
		redirect(302, `/client-dash/surveys/questionnaire/${params.surveyid}`);
	},
	deleteSurvQns: async ({ request }) => {
		type EntryId = {
			questionId: string;
			questionType: string;
		};
		const data = Object.fromEntries(await request.formData()) as EntryId;

		const { questionId, questionType } = data;

		try {
			await db.delete(QuestionOptions).where(eq(QuestionOptions.questionId, questionId));
			await db.delete(surveyqnsTableV2).where(eq(surveyqnsTableV2.questionId, questionId));
			await db.delete(surveyqnsTableV2).where(eq(surveyqnsTableV2.questionId, questionId));
		} catch (err) {
			console.error(err);
		}
	},
	editSurvQns: async ({ request }) => {
		const data = await request.formData();
		const qns = data.get('question') as string;
		const qid = data.get('questionId') as string;
		let map: string | any[] = [];
		data.forEach((value, name) => {
			if (name === 'option') {
				map = [...map, { option: value } as { option: string }];
			} else if (name === 'optionId') {
				const lastItem = map[map.length - 1];
				lastItem.id = value;
			}
		});
		try {
			await db
				.update(surveyqnsTableV2)
				.set({
					question: qns
				})
				.where(eq(surveyqnsTableV2.questionId, qid));

			for (const insert of map) {
				const { option, id } = editZodSchema.parse(insert);
				await db
					.update(QuestionOptions)
					.set({
						option: option
					})
					.where(eq(QuestionOptions.optionId, id));
			}
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(400, {
					errors
				});
			} else {
				console.error(err);
			}
		}
	},
	deleteOpt: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const { optionId } = data;

		try {
			await db.delete(QuestionOptions).where(eq(QuestionOptions.optionId, optionId as string));
		} catch (err) {
			console.error(err);
		}
	}
};
