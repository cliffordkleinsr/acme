import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db'
import { clientData, SurveyTable } from '$lib/server/schema'
import { eq, sql } from 'drizzle-orm';
export const load: PageServerLoad = async ({locals}) => {
    const surveys =  await db
    .select({
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        created: sql<Date>`${SurveyTable.createdAt}::timestamp::date`,
        status: SurveyTable.status,
    })
    .from(SurveyTable)
    .where(sql`${SurveyTable.status} = 'Draft' and ${SurveyTable.clientid} = ${locals.session?.userId}`)



   return {
        draft_surveys: surveys
   }
}