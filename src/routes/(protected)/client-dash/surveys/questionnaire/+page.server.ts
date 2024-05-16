import { db } from '$lib/server/db'
import { SurveyTable } from '$lib/server/schema'
import { eq } from 'drizzle-orm'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
   const surveys =  await db
    .select({
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        created: SurveyTable.createdAt
    })
    .from(SurveyTable)
    .where(eq(SurveyTable.status, "Draft"))

   return {
        surv: surveys
   }
}

export const actions: Actions = {
    deleteSurvey: async ({request}) => {
        type En = {
            id: string
        }
        const data = Object.fromEntries(await request.formData()) as En
        const { id } = data
        // console.log(data)
        try 
        {
            await db.delete(SurveyTable)
            .where(eq(SurveyTable.surveyid, id))
        } catch (err) 
        {
            console.error(err)
        }
    }
}