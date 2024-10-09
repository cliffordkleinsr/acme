import { db } from '$lib/server/db';
import {
	AnswersTable,
	QuestionOptions,
	SurveyTable,
	agentSurveysTable,
	surveyqnsTableV2
} from '$lib/server/schema';
import { asc, eq, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { gender } from '$lib/json';
import { z, ZodError } from 'zod';
import { fail } from '@sveltejs/kit';

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
export const load: PageServerLoad = async ({ params, locals: { user } }) => {
	const [data] = await db
		.select({
			id: SurveyTable.surveyid,
			title: SurveyTable.surveyTitle,
			desc: SurveyTable.surveyDescription,
			status: SurveyTable.status,
			gender: SurveyTable.target_gender,
			age: SurveyTable.target_age,
			from: sql<Date>`${SurveyTable.from}`,
			to: sql<Date>`${SurveyTable.to}`
		})
		.from(SurveyTable)
		.where(eq(SurveyTable.surveyid, params.surveyid));

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
		surv_data: data,
		surveyqns: questions,
		role: user?.role
	};
};
export const actions: Actions = {
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

	deleteMulti: async ({ request }) => {
		const data = await request.formData();
		const items = data.getAll('items') as string[];

		try {
			for (const item of items) {
				await db.delete(QuestionOptions).where(eq(QuestionOptions.questionId, item));
				await db.delete(surveyqnsTableV2).where(eq(surveyqnsTableV2.questionId, item));
				await db.delete(surveyqnsTableV2).where(eq(surveyqnsTableV2.questionId, item));
			}
		} catch (err) {
			console.error(err);
		}
	},

	draftSurvey: async ({ params }) => {
		try {
			// DELETE from ANSWERS TABLE
			await db.delete(AnswersTable).where(eq(AnswersTable.surveid, params.surveyid));
			// DELETE from AGENTS SURVEY TABLE
			await db.delete(agentSurveysTable).where(eq(agentSurveysTable.surveyid, params.surveyid));
			//  SET AS DRAFT
			await db
				.update(SurveyTable)
				.set({
					from: null,
					to: null,
					target: null,
					target_age: null,
					target_gender: null,
					external: false,
					status: 'Draft'
				})
				.where(sql`${SurveyTable.surveyid} = ${params.surveyid}`);
		} catch (err) {
			console.error(err);
		}
	}
};
