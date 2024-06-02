import { db } from '$lib/server/db';
import { AnswersTable, QuestionType, SurveyQnsTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const answers = await db
    .select({
        question_id: SurveyQnsTable.questionId,
        question_type: SurveyQnsTable.questionT,
        question: SurveyQnsTable.question,
        answer: sql<string>`${AnswersTable.answer}`,
        count: sql<number>`COUNT(*)`,
        percentage: sql<number>`(COUNT(*) * 100.0) / (
            SELECT COUNT(*) 
            FROM ${AnswersTable}
            WHERE ${AnswersTable.questionId} = ${SurveyQnsTable.questionId}
          )`
    })
    .from(SurveyQnsTable)
    .innerJoin(AnswersTable, eq(SurveyQnsTable.questionId, AnswersTable.questionId))
    // .where(eq(SurveyQnsTable.questionId, "a17b6059-cecf-4831-9121-8ffbac0385ab"))
    .groupBy(SurveyQnsTable.questionId, AnswersTable.answer);
    // .where(eq(SurveyQnsTable.questionId, "5593368d-8a05-4b9a-a0e6-34f04decd082"))
    return {
        answers
    }
};