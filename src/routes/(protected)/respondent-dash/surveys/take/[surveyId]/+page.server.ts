import { db } from '$lib/server/db';
import { SurveyQnsTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params}) => {
    const question_el = await db
    .select({
        id: SurveyQnsTable.questionId,
        name: SurveyQnsTable.question
    })
    .from(SurveyQnsTable)
    .where(eq(SurveyQnsTable.surveid, params.surveyId))
    

    return {
        qns_cnt : question_el.length,
        qns: question_el
    }
}