import { db } from '$lib/server/db';
import { AnswersTable, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
    let usr = locals.session?.userId
    let livesurveys =  await db
    .selectDistinctOn([SurveyTable.surveyid], {
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        from: SurveyTable.from,
        to: SurveyTable.to,
        res: AnswersTable.respondentId
    })
    .from(SurveyTable)
    .leftJoin(AnswersTable,
      sql`${SurveyTable.surveyid} =  ${AnswersTable.surveid} and ${AnswersTable.respondentId} = ${usr}`
    )
    .where(sql`${SurveyTable.status} = 'Live' and ${AnswersTable.respondentId} is null`)

    const live_surv = livesurveys.map(survey =>({
        id: survey.id,
        title: survey.title,
        from: survey.from?.toISOString().substring(0, 10),
        to: survey.to?.toISOString().substring(0, 10)
    }))
       
    return {
            live_surv
            
    }
}