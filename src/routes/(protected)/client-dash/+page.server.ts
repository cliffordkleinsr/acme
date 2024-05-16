import { db } from '$lib/server/db';
import { SurveyTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
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

    return {
            draft_surv: draftsurveys,
            live_surv: livesurveys
    }
}