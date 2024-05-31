import { db } from '$lib/server/db';
import { AnswersTable, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
    const allsurveys =  await db
        .select({
            id: SurveyTable.surveyid,
            title: SurveyTable.surveyTitle,
            created: SurveyTable.createdAt,
            status: SurveyTable.status
        })
        .from(SurveyTable)
    const draftsurveys =  await db
        .select({
            id: SurveyTable.surveyid,
            title: SurveyTable.surveyTitle,
            created: SurveyTable.createdAt,
            status: SurveyTable.status
        })
        .from(SurveyTable)
        .where(eq(SurveyTable.status, "Draft"))

    const livesurveys =  await db
        .select({
            id: SurveyTable.surveyid,
            title: SurveyTable.surveyTitle,
            created: SurveyTable.createdAt,
            status: SurveyTable.status
        })
        .from(SurveyTable)
        .where(eq(SurveyTable.status, "Live"))

    const closedsurveys =  await db
        .select({
            id: SurveyTable.surveyid,
            title: SurveyTable.surveyTitle,
            created: SurveyTable.createdAt,
            status: SurveyTable.status
        })
        .from(SurveyTable)
        .where(eq(SurveyTable.status, "Closed"))

    const total_agents = await db
    .selectDistinctOn([AnswersTable.respondentId],{
        agent: AnswersTable.respondentId
    })
    .from(AnswersTable)
    .leftJoin(SurveyTable, 
        eq(AnswersTable.surveid, SurveyTable.surveyid)
    )
    .where(sql`${SurveyTable.clientid} = ${locals.session?.userId}`)
    return {
            count: total_agents.length,
            all_surv: allsurveys,
            draft_surv: draftsurveys,
            live_surv: livesurveys,
            closed_surv: closedsurveys
    }
}