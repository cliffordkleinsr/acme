import { db } from '$lib/server/db';
import { AnswersTable, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
    const select = {
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        created: SurveyTable.createdAt,
        status: SurveyTable.status,
    };

  const [allsurveys, draftsurveys, livesurveys, closedsurveys] = await Promise.all([
    db.select(select).from(SurveyTable),
    db.select(select).from(SurveyTable).where(eq(SurveyTable.status, "Draft")),
    db.select(select).from(SurveyTable).where(eq(SurveyTable.status, "Live")),
    db.select(select).from(SurveyTable).where(eq(SurveyTable.status, "Closed")),
  ]);

  const total_agents = await db
    .selectDistinctOn([AnswersTable.respondentId], {
      agent: AnswersTable.respondentId,
    })
    .from(AnswersTable)
    .leftJoin(SurveyTable, eq(AnswersTable.surveid, SurveyTable.surveyid))
    .where(sql`${SurveyTable.clientid} = ${locals.session?.userId}`);

  const draft = draftsurveys.map(item =>({
    id: item.id,
    title: item.title,
    created: `${item.created.toLocaleDateString()} ${item.created.toLocaleTimeString()}`,
    status: item.status,
  }))

  const live = livesurveys.map(item =>({
    id: item.id,
    title: item.title,
    created: `${item.created.toLocaleDateString()} ${item.created.toLocaleTimeString()}`,
    status: item.status,
  }))

  const closed = closedsurveys.map(item =>({
    id: item.id,
    title: item.title,
    created: `${item.created.toLocaleDateString()} ${item.created.toLocaleTimeString()}`,
    status: item.status,
  }))

  return {
    count: total_agents.length,
    all_surv: allsurveys,
    draft_surv: draft,
    live_surv: live,
    closed_surv: closed,
  }

}