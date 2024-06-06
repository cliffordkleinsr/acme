import { db } from '$lib/server/db';
import { AnswersTable, SurveyQnsTable, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params}) => {
    const questions = await db
    .selectDistinctOn([SurveyQnsTable.questionId],{
        id: SurveyQnsTable.questionId,
        question: SurveyQnsTable.question,
        surv_id: SurveyQnsTable.surveid,
        question_type: SurveyQnsTable.questionT,
        answer: sql<string[]>`ARRAY_AGG(${AnswersTable.answer}) AS answers`
    })
    .from(SurveyQnsTable)
    .leftJoin(AnswersTable, 
        eq(SurveyQnsTable.questionId, AnswersTable.questionId)
    )
    .where(eq(SurveyQnsTable.surveid, params.surveyId))
    .groupBy(SurveyQnsTable.questionId, SurveyQnsTable.question, SurveyQnsTable.surveid);
    // questions.forEach(element => {
    //     console.log(element)
        
    // });
    return {
        questions,
    }
}