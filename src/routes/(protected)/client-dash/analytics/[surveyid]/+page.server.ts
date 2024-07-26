import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { AnswersTable, QuestionType, surveyqnsTableV2, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({locals:{user}, params}) => {
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
    .leftJoin(SurveyTable, eq(surveyqnsTableV2.surveid, SurveyTable.surveyid))
    .where(sql`${SurveyTable.clientid} =  ${user?.id} and ${SurveyTable.surveyid} = ${params.surveyid}`)
    .groupBy(surveyqnsTableV2.questionId, AnswersTable.answer);
    // .where(eq(surveyqnsTableV2.questionId, "5593368d-8a05-4b9a-a0e6-34f04decd082"))
    return {
        answers
    }
};