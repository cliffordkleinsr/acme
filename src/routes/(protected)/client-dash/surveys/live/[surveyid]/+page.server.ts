import { db } from '$lib/server/db';
import { SurveyTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({params}) => {
    const surveys = await db
    .select({
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        desc: SurveyTable.surveyDescription,
    })
    .from(SurveyTable)
    .where(eq(SurveyTable.surveyid, params.surveyid))

    return {
        survey_data: surveys
    }
}

export const actions: Actions = {
    goLive: async ({request, params}) => {
        type SurveyTimes = {
            from: string,
            to: string
        }
        const data = Object.fromEntries(await request.formData()) as SurveyTimes
        const { from, to } = data
        let starting = new Date(from)
        let ending = new Date(to)
      
        try 
        {
            await db.update(SurveyTable)
            .set({
                status: "Live",
                from: starting,
                to: ending,
                updatedAt: new Date()
                
            })
            .where(eq(SurveyTable.surveyid, params.surveyid))
            
        } catch (err) 
        {
            console.error(err)
        }

        redirect(303, '/client-dash')
    }
}