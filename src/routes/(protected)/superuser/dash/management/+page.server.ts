import { db } from '$lib/server/db';
import { agentSurveysTable, AnswersTable, clientData, progressTable, QuestionOptions, surveyqnsTableV2, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const data  = await db
    .select({
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        status: SurveyTable.status, 
        created: sql<Date>`${SurveyTable.createdAt}::timestamp::date`
    })
    .from(SurveyTable)

    return {
        survs: data,
    }
};

export const actions: Actions = {
    deleteSurvey: async ({request}) => {
        type En = {
            id: string
        }
        const data = Object.fromEntries(await request.formData()) as En
        const { id } = data
        // console.log(data)
        try 
        {   
            await db.delete(progressTable)
            .where(eq(progressTable.surveyid, id))
            await db.delete(agentSurveysTable)
            .where(eq(agentSurveysTable.surveyid, id))
            await db.delete(AnswersTable)
            .where(eq(AnswersTable.surveid, id))
            await db.delete(QuestionOptions)
                .where(sql`
                    ${QuestionOptions.questionId} IN (
                    SELECT ${surveyqnsTableV2.questionId}
                    FROM ${surveyqnsTableV2}
                    WHERE ${surveyqnsTableV2.surveid} = ${id}
                )`
            )
            await db.delete(surveyqnsTableV2)
            .where(eq(surveyqnsTableV2.surveid, id))
            await db.delete(SurveyTable)
            .where(eq(SurveyTable.surveyid, id))
        } catch (err) 
        {
            console.error(err)
        }
    }
};