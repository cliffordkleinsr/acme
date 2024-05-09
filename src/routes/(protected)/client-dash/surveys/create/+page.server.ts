import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { SurveyTable } from '$lib/server/schema';
import { generateId } from 'lucia';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({locals, request}) => {
        const data = Object.fromEntries(await request.formData())
        const { surveyTitle , surveyDescription } = data
        
        const userid = locals.user?.id
        // ensure not empty 
        if (surveyTitle === '' && surveyDescription === '') {
            return fail(404, {message: 'Name and content cannot be null'})
        }

        try 
        {   
            const id = generateId(15)
            await db.insert(SurveyTable).values({
                surveyid:id,
                clientid:userid,
                surveyTitle: surveyTitle,
                surveyDescription: surveyDescription
            })
            // await db.insert(SurveyTable).values({
            //     clientid: userid,
            //     surveyTitle: name,
            //     surveyDescription: content,

            // })
        } catch (err) 
        {
            console.error(err)
        }
        redirect(303, '/client-dash/surveys/questionnaire')
    }
};