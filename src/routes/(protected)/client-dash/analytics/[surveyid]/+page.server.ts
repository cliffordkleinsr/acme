import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { agentData, agentSurveysTable, AnswersTable, QuestionType, surveyqnsTableV2, SurveyTable, UsersTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import { countAgents, countTotAgents } from '$lib/server/db_utils';

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
    
    // const demographics = await db
    //     .select({
    //         agents: sql`${agentSurveysTable.agentid}`,
    //         age_dem: UsersTable.gender,
    //         loc_dem: sql<string>`UPPER(${agentData.county})`,
    //         sec_dem: sql<string>`SPLIT_PART(${agentData.sector}, '-', 2)`

    //     })
    //     .from(agentSurveysTable)
    //     .rightJoin(agentData, eq(agentSurveysTable.agentid, agentData.agentid))
    //     .leftJoin(UsersTable, eq(agentSurveysTable.agentid, UsersTable.id))
    //     .where(
    //         sql`${agentSurveysTable.surveyid} = ${params.surveyid}`
    //     )

    const cnt_counties = await db
        .select({
            loc_dem: sql<string>`UPPER(${agentData.county})`,
            agents: sql<number>`COUNT(DISTINCT(${agentData.agentid}))`
        })
        .from(agentData)
        .leftJoin(agentSurveysTable, sql`${agentData.agentid} = ${agentSurveysTable.agentid}`)
        .where(
            sql`${agentSurveysTable.surveyid} = ${params.surveyid} and ${agentSurveysTable.survey_completed} = TRUE`    
        )
        .groupBy(agentData.county)

    const cnt_gender= await db
        .select({
            gen_dem: sql<string>`UPPER(${UsersTable.gender})`,
            agents: sql<number>`COUNT(DISTINCT(${UsersTable.id}))`
        })
        .from(UsersTable)
        .leftJoin(agentSurveysTable, sql`${UsersTable.id} = ${agentSurveysTable.agentid}`)
        .where(
            sql`${agentSurveysTable.surveyid} = ${params.surveyid} and ${agentSurveysTable.survey_completed} = TRUE`    
        )
        .groupBy(UsersTable.gender)

    const cnt_sect=  await db
        .select({
            sec_dem: sql<string>`SPLIT_PART(${agentData.sector}, '-', 2)`,
            agents: sql<number>`COUNT(DISTINCT(${agentData.agentid}))`
        })
        .from(agentData)
        .leftJoin(agentSurveysTable, sql`${agentData.agentid} = ${agentSurveysTable.agentid}`)
        .where(
            sql`${agentSurveysTable.surveyid} = ${params.surveyid} and ${agentSurveysTable.survey_completed} = TRUE`    
        )
        .groupBy(agentData.sector)

    const completed = await countAgents(true, params.surveyid)
    const total = await countTotAgents(params.surveyid)
    return {
        answers,
        cnt_counties,
        cnt_gender,
        cnt_sect,
        completed,
        total

        // demographics,
    }
};