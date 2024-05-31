import { db } from '$lib/server/db';
import { AnswersTable, SurveyQnsTable, SurveyTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params}) => {
    const questions = await db
    .selectDistinctOn([SurveyQnsTable.questionId],{
        id: SurveyQnsTable.questionId,
        question: SurveyQnsTable.question,
        surv_id: SurveyQnsTable.surveid,
        answer: AnswersTable.answer
    })
    .from(SurveyQnsTable)
    .leftJoin(AnswersTable, 
        eq(SurveyQnsTable.questionId, AnswersTable.questionId)
    )
    .where(eq(SurveyQnsTable.surveid, params.surveyId))

    return {
        questions,
    }
}