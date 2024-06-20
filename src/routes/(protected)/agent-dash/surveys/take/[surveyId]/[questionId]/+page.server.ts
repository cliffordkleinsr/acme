import { db } from '$lib/server/db';
import { AnswersTable, QuestionOptions, SurveyQnsTable, SurveyTable, surveyqnsTableV2 } from '$lib/server/schema';
import { eq, asc, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError, z } from "zod";
import { setTarget } from '$lib/server/db_utils';

const questionZodSchema = z.object({
    answer: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'})
})
const rateZodSchema = z.object({
    answer: z
        .string({ required_error: 'Option is required' })
        .min(1, { message: 'Option is required' })
})
const rankansZodSchema = z.object({
    id: z
        .string({ required_error: 'id is required' })
        .min(1, { message: 'id is required' }),
    option: z
        .string({ required_error: 'Option is required' })
        .min(2, { message: 'Option must have atleast 2 characters' })
        .max(500, { message: 'Option must have a maximum 500 characters'}),
})
const optionalansZodSchema = z.object({
    answer: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'}),
    id: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'})
})
export const load: PageServerLoad = async ({params, cookies}) => {
    // curr
    const surveyqns = await db
        .select({
            id: surveyqnsTableV2.questionId,
            question: surveyqnsTableV2.question,
            question_type: surveyqnsTableV2.questionT,
            likert_key: surveyqnsTableV2.likertKey,
            optionid: sql<string[]>`ARRAY_AGG(${QuestionOptions.optionId})`,
            options: sql<string[]>`ARRAY_AGG(${QuestionOptions.option})`
        })
        .from(surveyqnsTableV2)
        .leftJoin(QuestionOptions, eq(surveyqnsTableV2.questionId, QuestionOptions.questionId))
        .where(eq(surveyqnsTableV2.questionId, params.questionId))
        .groupBy(surveyqnsTableV2.questionId, surveyqnsTableV2.question)
        .orderBy(asc(surveyqnsTableV2.updatedAt))

    // for percentages
    const ids = await db
        .select()
        .from(surveyqnsTableV2)
        .where(
            eq(surveyqnsTableV2.surveid, params.surveyId)
        )
        .orderBy(asc(surveyqnsTableV2.updatedAt))
    
    let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
    return {
        count: current_ix,
        questions: surveyqns[0],
        question_cnt: ids.length
    }
}

export const actions: Actions = {
    defaultAns: async ({request, params, cookies, locals}) => {
        const data = await request.formData()
        // console.log(data)
        let map: any[] = []
        data.forEach(element => {
            map = [...map, {answer: element} as {answer: string}]
            
        })
        // console.log(map)
        const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
        
        let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
        // await db.delete(AnswersTable).where(eq(AnswersTable.questionId, params.questionId))
        try 
        {
            // validate
            for (const element of map) {
                const { answer } = questionZodSchema.parse(element);
                await db.insert(AnswersTable).values({
                    questionId: params.questionId,
                    surveid: params.surveyId,
                    answer: answer,
                    respondentId: locals.session?.userId as string
                });
            }
            
            

        } catch (err) 
        {
            
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten()
                return fail(400,{
                    errors
                })
            }
            else {
                console.error(err)
            }
        }
        // Dynamic routing with incremental counter
         
         if (current_ix < ids.length -1) {
            current_ix++;
            // Set the updated current_ix in the cookie
            cookies.set('current_ix', current_ix.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5, // expires after 5 mins
            })
            redirect(303, `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`);
        } else {
            // If there are no more IDs, redirect to a different route or perform any other desired action
            cookies.set('current_ix', '0', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0, // Expire the cookie immediately
            })
            // set the new target since this guy cant do the survey again
            await setTarget(params.surveyId)
            //then redirect
            redirect(303, '/agent-dash/surveys/complete')
        }
    },
    addOptAns: async({request, cookies, params, locals}) => {
        const data = await request.formData()
        // console.log(data)
        let map:any[] = []
        data.forEach((value, name) => {
            if (name === 'optionId') {
               map.push({id: value}) 
            }
            else if (name === 'answer') {
                const lastItem = map[map.length - 1];
                lastItem.answer = value;
            }
        })
        const filtered = map.filter(obj => obj.hasOwnProperty('answer'))

        const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
        
        let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
        // await db.delete(AnswersTable).where(eq(AnswersTable.questionId, params.questionId))
        try 
        {
            for (const insert of filtered) {
                //validate
                const { answer, id} = optionalansZodSchema.parse(insert)
                await db
                .insert(AnswersTable)
                .values({
                    questionId: params.questionId,
                    surveid: params.surveyId,
                    optionId: id,
                    answer: answer,
                    respondentId: locals.session?.userId as string
                })

            }
            
        } catch (err) 
        {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten()
                return fail(400,{
                    errors
                })
            }
            else {
                console.error(err)
            }
        }
        // Dynamic routing with incremental counter
         
         if (current_ix < ids.length -1) {
            current_ix++;
            // Set the updated current_ix in the cookie
            cookies.set('current_ix', current_ix.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5, // expires after 5 mins
            });
            redirect(303, `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`);
        } else {
            // If there are no more IDs, redirect to a different route or perform any other desired action
            cookies.set('current_ix', '0', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0, // Expire the cookie immediately
            });
            // set the new target since this guy cant do the survey again
            await setTarget(params.surveyId)
            //then redirect
            redirect(303, '/agent-dash/surveys/complete');
        }
    },
    addRankAns: async ({request, params, cookies, locals}) => {
        const data = await request.formData()
        
        let map: string | any[] = []
        data.forEach((value, name) => {
            // console.log(element)
            if (name === 'rankId') {
               map.push({id : value}) 
            }
            else if (name === 'option') {
                const lastItem = map[map.length - 1];
                lastItem.option = value;
            }
        })

        const filtered = map.filter(obj => obj.hasOwnProperty("option"))
        const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
        
        let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
        // await db.delete(AnswersTable).where(eq(AnswersTable.questionId, params.questionId))
        try 
        {
            
            for (const insert of filtered) {
                //validate
                const {id, option } = rankansZodSchema.parse(insert)
                await db
                .insert(AnswersTable)
                .values({
                    questionId: params.questionId,
                    surveid: params.surveyId,
                    rankId: id,
                    answer: option,
                    respondentId: locals.session?.userId as string
                })

            }
            
        } catch (err) 
        {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten()
                return fail(400,{
                    errors
                })
            }
            else {
                console.error(err)
            }
        }
        // Dynamic routing with incremental counter
         
         if (current_ix < ids.length -1) {
            current_ix++;
            // Set the updated current_ix in the cookie
            cookies.set('current_ix', current_ix.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5, // expires after 5 mins
            });
            redirect(303, `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`);
        } else {
            // If there are no more IDs, redirect to a different route or perform any other desired action
            cookies.set('current_ix', '0', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0, // Expire the cookie immediately
            });
            // set the new target since this guy cant do the survey again
            await setTarget(params.surveyId)
            //then redirect
            redirect(303, '/agent-dash/surveys/complete');
        }
    },
    addRatAns: async ({request, params, cookies, locals}) => {
        const data = await request.formData()
        // console.log(data)
        let map: any[] = []
        data.forEach(element => {
            map = [...map, {answer: element} as {answer: string}]
            
        })
        // console.log(map)

        const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
        
        let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
        // await db.delete(AnswersTable).where(eq(AnswersTable.questionId, params.questionId))
        try 
        {
            // validate
            for (const element of map) {
                const { answer } = rateZodSchema.parse(element);
                await db.insert(AnswersTable).values({
                    questionId: params.questionId,
                    surveid: params.surveyId,
                    answer: answer,
                    respondentId: locals.session?.userId as string
                });
            }

        } catch (err) 
        {
            
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten()
                return fail(400,{
                    errors
                })
            }
            else {
                console.error(err)
            }
        }
        // Dynamic routing with incremental counter
         
         if (current_ix < ids.length -1) {
            current_ix++;
            // Set the updated current_ix in the cookie
            cookies.set('current_ix', current_ix.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5, // expires after 5 mins
            });
            redirect(303, `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`)
        } else {
            // If there are no more IDs, redirect to a different route or perform any other desired action
            cookies.set('current_ix', '0', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0, // Expire the cookie immediately
            })
            // set the new target since this guy cant do the survey again
            await setTarget(params.surveyId)
            //then redirect
            redirect(303, '/agent-dash/surveys/complete')
        }
    },
}