import { db } from '$lib/server/db';
import { AnswersTable, QuestionType, surveyqnsTableV2 } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const answers = await db
    .select({
        question_id: surveyqnsTableV2.questionId,
        question_type: surveyqnsTableV2.questionT,
        question: surveyqnsTableV2.question,
        answer: sql<string>`${AnswersTable.answer}`,
        count: sql<number>`COUNT(*)`,
        percentage: sql<number>`(COUNT(*) * 100.0) / (
            SELECT COUNT(*) 
            FROM ${AnswersTable}
            WHERE ${AnswersTable.questionId} = ${surveyqnsTableV2.questionId}
          )`
    })
    .from(surveyqnsTableV2)
    .innerJoin(AnswersTable, eq(surveyqnsTableV2.questionId, AnswersTable.questionId))
    // .where(eq(surveyqnsTableV2.questionId, "a17b6059-cecf-4831-9121-8ffbac0385ab"))
    .groupBy(surveyqnsTableV2.questionId, AnswersTable.answer);
    // .where(eq(surveyqnsTableV2.questionId, "5593368d-8a05-4b9a-a0e6-34f04decd082"))
    return {
        answers
    }
};