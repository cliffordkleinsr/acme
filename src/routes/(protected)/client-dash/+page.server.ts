import { db } from '$lib/server/db';
import { AnswersTable, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
    const select = {
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        created: sql<Date>`${SurveyTable.createdAt}::timestamp::date`,
        status: SurveyTable.status,
    };
  
  const [allsurveys, draftsurveys, livesurveys, closedsurveys] = await Promise.all([
    db.select(select).from(SurveyTable).where(sql`${SurveyTable.clientid} = ${locals.user?.id}`),
    db.select(select).from(SurveyTable).where(sql`${SurveyTable.clientid} = ${locals.user?.id} and ${SurveyTable.status} = 'Draft'`),
    db.select(select).from(SurveyTable).where(sql`${SurveyTable.clientid} = ${locals.user?.id} and ${SurveyTable.status} = 'Live'`),
    db.select(select).from(SurveyTable).where(sql`${SurveyTable.clientid} = ${locals.user?.id} and ${SurveyTable.status} = 'Closed'`),
  ]);

  const total_agents = await db
    .selectDistinctOn([AnswersTable.agentId], {
      agent: AnswersTable.agentId,
    })
    .from(AnswersTable)
    .leftJoin(SurveyTable, eq(AnswersTable.surveid, SurveyTable.surveyid))
    .where(sql`${SurveyTable.clientid} = ${locals.session?.userId}`);


  return {
    count: total_agents.length,
    all_surv: allsurveys,
    draft_surv: draftsurveys,
    live_surv: livesurveys,
    closed_surv: closedsurveys,
  }

}