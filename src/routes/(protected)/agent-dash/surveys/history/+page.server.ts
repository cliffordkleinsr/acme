import { db } from '$lib/server/db';
import { AnswersTable, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
    const hist = await db
    .selectDistinctOn([SurveyTable.surveyid])
    .from(SurveyTable)
    .leftJoin(AnswersTable,
        eq(SurveyTable.surveyid, AnswersTable.surveid)
    )
    .where(sql`(${SurveyTable.status} = 'Live' or ${SurveyTable.status} = 'Closed') and ${AnswersTable.respondentId} = ${locals.session?.userId}`)

    const history = hist.map(sv =>({
        id: sv.surveys.surveyid,
        title: sv.surveys.surveyTitle,
        taken: sv.surveys.updatedAt.toISOString().substring(0, 10),
        at: sv.surveys.updatedAt.toLocaleTimeString()
    }))
    return {
        history
    }
};