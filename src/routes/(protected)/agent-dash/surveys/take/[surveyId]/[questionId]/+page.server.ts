import { db } from '$lib/server/db';
import { AnswersTable, SurveyQnsTable, SurveyTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError, z } from "zod";

const questionZodSchema = z.object({
    answer: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'})
})
export const load: PageServerLoad = async ({params, cookies}) => {
    // curr
    const surveyqns = await db
        .select()
        .from(SurveyQnsTable)
        .where(eq(SurveyQnsTable.questionId, params.questionId))
    // all
    const ids = await db
        .select()
        .from(SurveyQnsTable)
        .where(
            eq(SurveyQnsTable.surveid, params.surveyId)
        )
    const mapped = surveyqns.map(qns=> ({
        id: qns.questionId,
        question: qns.question,
        question_type: qns.questionT,
        options: [
            {name: qns.option1 as string},
            {name: qns.option2 as string},
            {name: qns.option3 as string}
        ]
    }))
    
    let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
    return {
        count: current_ix,
        questions: mapped[0],
        question_cnt: ids.length
    }
}

export const actions: Actions = {
    default: async ({request, params, cookies, locals}) => {
        type Answer = {
            answer: string
        }
        const data = Object.fromEntries(await request.formData()) as Answer
        const tgt = await db
            .select({target: SurveyTable.target})
            .from(SurveyTable)
            .where(eq(SurveyTable.surveyid, params.surveyId))
        let new_tgt = tgt[0].target! - 1
        const ids = await db
            .select({
                id:SurveyQnsTable.questionId
            })
            .from(SurveyQnsTable)
            .where(
                eq(SurveyQnsTable.surveid, params.surveyId)
            )
            // await db.delete(AnswersTable).where(eq(AnswersTable.questionId, '158b1703-51b2-4bb9-b02d-e57f4a7ae11c'))
        // console.log(ids)
        let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
        try 
        {
            // validate
            const { answer} = questionZodSchema.parse(data)
            if (current_ix === 0) {
                await db
                .update(SurveyTable)
                .set({
                    target: new_tgt
                })
                .where(eq(SurveyTable.surveyid, params.surveyId))
            }
            
            await db
            .insert(AnswersTable)
            .values({
                questionId: params.questionId,
                surveid: params.surveyId,
                answer: answer,
                respondentId: locals.session?.userId as string
            })

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
        // // Dynamic routing with incremental counter
         
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
            redirect(303, '/agent-dash/surveys/complete');
        }
    }
}