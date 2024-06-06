import { db } from '$lib/server/db';
import { AnswersTable, SurveyQnsTable, SurveyTable } from '$lib/server/schema';
import { eq, asc } from 'drizzle-orm';
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
        .orderBy(asc(SurveyQnsTable.updatedAt))
    const mapped = surveyqns.map(qns=> ({
        id: qns.questionId,
        question: qns.question,
        question_type: qns.questionT,
        options: [
            {id: '1', name: qns.option1 as string},
            {id: '2', name: qns.option2 as string},
            {id: '3', name: qns.option3 as string},
            {id: '4', name: qns.option4 as string},
            {id: '5', name: qns.option5 as string},
            {id: '6', name: qns.option6 as string},
            {id: '7', name: qns.option7 as string}
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
        // type Answer = {
        //     answer: string
        // }
        const data = await request.formData() //as Answer

        let map: any[] = []
        data.forEach(element => {
            // console.log(element)
            map = [...map, {answer: element} as {answer: string}]
            
        });
        // console.log(map[0])
        // let group = data.getAll('answer')
        // const formEntries = Array.from(data.entries())
        //     .map(([name, value]) => ({ [name]: value }))
        // Object.fromEntries(data)

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
        
        // await db.delete(AnswersTable).where(eq(AnswersTable.questionId, "4e62864f-268d-408f-afb9-b5e996c7fd88"))
        let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
        try 
        {
            
            if (current_ix === 0) {
                await db
                .update(SurveyTable)
                .set({
                    target: new_tgt
                })
                .where(eq(SurveyTable.surveyid, params.surveyId))
            }
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