import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db'
import { SurveyTable } from '$lib/server/schema'
import { eq } from 'drizzle-orm';
export const load: PageServerLoad = async () => {
    const surveys =  await db
    .select({
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        created: SurveyTable.createdAt,
        status: SurveyTable.status
    })
    .from(SurveyTable)
    .where(eq(SurveyTable.status, "Draft"))

   return {
        all_surveys: surveys
   }   
}