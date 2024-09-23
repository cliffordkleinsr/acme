import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { agentData, agentSurveysTable, AnswersTable, QuestionType, surveyqnsTableV2, SurveyTable, UsersTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import { countAgents, countFltAgents, countTotAgents, countTotFltrdAgents, getAnswers, getCounties, getGender, getSector } from '$lib/server/db_utils';

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
    const male_answers = await getAnswers('male', user?.id as string, params.surveyid)
    const female_answers = await getAnswers('female', user?.id as string, params.surveyid)
    const male_ctys = await getCounties('male', params.surveyid)
    const female_ctys = await getCounties('female', params.surveyid)
    const male_gender = await getGender('male', params.surveyid)
    const female_gender = await getGender('female', params.surveyid)
    const male_sector= await getSector('male', params.surveyid)
    const female_sector = await getSector('female', params.surveyid)
    const male_tot= await countTotFltrdAgents('male', params.surveyid)
    const female_tot = await countTotFltrdAgents('female', params.surveyid)
    const male_comp= await countFltAgents('male', true, params.surveyid)
    const female_comp = await countFltAgents('female', true, params.surveyid)
    
    return {
        answers,
        male_answers,
        female_answers,
        male_ctys,
        female_ctys,
        cnt_counties,
        cnt_gender,
        male_gender,
        female_gender,
        cnt_sect,
        male_sector,
        female_sector,
        completed,
        male_comp,
        female_comp,
        total,
        male_tot,
        female_tot,
        // demographics,
    }
};