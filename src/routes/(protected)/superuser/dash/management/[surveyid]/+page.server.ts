import { db } from '$lib/server/db';
import { QuestionOptions, SurveyTable, surveyqnsTableV2 } from '$lib/server/schema';
import { asc, eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { gender } from '$lib/json';

export const load: PageServerLoad = async ({params}) => {
    const [data] = await db
    .select({
        id: SurveyTable.surveyid,
        title:SurveyTable.surveyTitle,
        desc: SurveyTable.surveyDescription,
        status: SurveyTable.status,
        gender: SurveyTable.target_gender,
        age: SurveyTable.target_age,
        from: sql<Date>`${SurveyTable.from}`,
        to: sql<Date>`${SurveyTable.to}`
    })
    .from(SurveyTable)
    .where(eq(SurveyTable.surveyid , params.surveyid))
    
    const questions = await db
            .select({
                id: surveyqnsTableV2.questionId,
                question: surveyqnsTableV2.question,
                question_type: surveyqnsTableV2.questionT,
                likert_key: surveyqnsTableV2.likertKey,
                optionid: sql<string[]>`ARRAY_AGG(${QuestionOptions.optionId}) AS optionid`,
                options: sql<string[]>`ARRAY_AGG(${QuestionOptions.option}) AS options`
            })
            .from(surveyqnsTableV2)
            .leftJoin(QuestionOptions, eq(surveyqnsTableV2.questionId, QuestionOptions.questionId))
            .where(eq(surveyqnsTableV2.surveid, params.surveyid))
            .groupBy(surveyqnsTableV2.questionId, surveyqnsTableV2.question)
            .orderBy(asc(surveyqnsTableV2.updatedAt))
    return {
        surv_data: data,
        surveyqns: questions
    }
};