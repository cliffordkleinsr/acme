import { db } from '$lib/server/db';
import { agentSurveysTable, AnswersTable, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { calculateAge } from '$lib/helperFunctions/helpers';
import { gender } from '$lib/json';

export const load: PageServerLoad = async ({locals}) => {
    let usr = locals.session?.userId as string
    const available_qns = await db
        .select({
            id: sql<string>`${SurveyTable.surveyid}`,
            title: sql<string>`${SurveyTable.surveyTitle}`,
            from: sql<Date>`${SurveyTable.from}::timestamp::date`,
            to: sql<Date>`${SurveyTable.to}::timestamp::date`,
        })
        .from(agentSurveysTable)
        .leftJoin(SurveyTable, sql`${agentSurveysTable.surveyid} = ${SurveyTable.surveyid}`)
        .where(
            sql`
                ${agentSurveysTable.agentid} = ${usr} 
                and
                ${agentSurveysTable.survey_completed} = false 
                and
                 ${SurveyTable.status} = 'Live'
            `
        )
    return {
        available_qns  
    }
}