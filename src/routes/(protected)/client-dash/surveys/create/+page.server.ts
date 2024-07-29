import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { clientData, SurveyTable } from '$lib/server/schema';
import { generateId } from 'lucia';
import { createNewSurvey } from '$lib/server/db_utils';
import { eq, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({locals:{user}}) => {
    const surveys = await db
    .select({
        id: SurveyTable.surveyid
    })
    .from(SurveyTable)
    .leftJoin(clientData, eq(SurveyTable.clientid, clientData.clientId))
    .where(sql`
        ${SurveyTable.createdAt} BETWEEN ${clientData.processed_at} - INTERVAL '1 week' AND ${clientData.expires_at} 
        AND 
        ${SurveyTable.clientid} = ${user?.id}
        `)
    return {
        surveys
    }
};


export const actions: Actions = {
    default: async ({locals, request}) => {
        type FormData = {
            surveyTitle: string;
            surveyDescription: string;
        }
        const data = Object.fromEntries(await request.formData()) as FormData
        
        const { surveyTitle , surveyDescription } = data
        
        const userid: string = locals.user?.id || ''
        // ensure not empty 
        if (surveyTitle === '' && surveyDescription === '') {
            return fail(404, {message: 'Name and content cannot be null'})
        }

        try 
        {   
            const id = generateId(15)
            await createNewSurvey({
                surveyid: id,
                clientid: userid,
                surveyTitle: surveyTitle,
                surveyDescription: surveyDescription
            })

        } catch (err) 
        {
            console.error(err)
        }
        redirect(303, '/client-dash/surveys/questionnaire')
    }
};