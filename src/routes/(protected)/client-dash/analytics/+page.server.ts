import { agentSurveysTable, AnswersTable, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const overview = await db
		.select({
			id: SurveyTable.surveyid,
			title: SurveyTable.surveyTitle,
			at: sql<string>`to_char((${SurveyTable.createdAt}::timestamp at time zone 'UTC' at time zone ${timezone}), 'DD/MM/YYYY HH24:MI:SS')`,
			tot_resp: sql<number>`COUNT(${agentSurveysTable.agentid})`
		})
		.from(SurveyTable)
		.leftJoin(
			agentSurveysTable,
			sql`${SurveyTable.surveyid} = ${agentSurveysTable.surveyid} and ${agentSurveysTable.survey_completed} = true`
		)
		.where(sql`${SurveyTable.clientid} = ${user?.id!} and ${SurveyTable.status} != 'Draft'`)
		.groupBy(SurveyTable.surveyTitle, SurveyTable.surveyid);

	return {
		overview
	};
};
