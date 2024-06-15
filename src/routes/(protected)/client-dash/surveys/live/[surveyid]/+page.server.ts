import { db } from '$lib/server/db';
import { SurveyTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError, z } from "zod"

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
            from: string
            to: string
            target: string
            target_age_group: string
            target_gender: string
        }
        const data = Object.fromEntries(await request.formData()) as SurveyTimes
        console.log(data)
        const { from, to, target, target_age_group, target_gender } = data
        let starting = new Date(from)
        let ending = new Date(to)
      
        try 
        {
            await db.update(SurveyTable)
            .set({
                status: "Live",
                from: starting,
                to: ending,
                target: parseInt(target),
                target_age: target_age_group,
                target_gender:target_gender,
                updatedAt: new Date()
                
            })
            .where(eq(SurveyTable.surveyid, params.surveyid))
            
        } catch (err) 
        {
            if (err instanceof ZodError)
            {
                // Handle Zod validation errors
                const { fieldErrors: errors } = err.flatten()

                return fail(400,{
                    errors
                })
            }
            else 
            {
                console.error(err)
            }
        }

        redirect(303, '/client-dash')
    }
}