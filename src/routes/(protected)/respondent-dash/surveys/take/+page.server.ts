import { db } from '$lib/server/db';
import { SurveyTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

    let livesurveys =  await db
    .select({
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        from: SurveyTable.from,
        to: SurveyTable.to
    })
    .from(SurveyTable)
    .where(eq(SurveyTable.status, "Live"))

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