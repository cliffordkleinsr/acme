import { db } from '$lib/server/db';
import { AnswersTable, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { calculateAge } from '$lib/helperFunctions/helpers';
import { gender } from '$lib/json';

export const load: PageServerLoad = async ({locals}) => {
    let usr = locals.session?.userId
    let cur_usr_gen = locals.user?.gender
    let cur_usr_age = locals.user?.age

    let livesurveys =  await db
    .selectDistinctOn([SurveyTable.surveyid], {
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        from: sql<Date>`${SurveyTable.from}::timestamp::date`,
        to: sql<Date>`${SurveyTable.to}::timestamp::date`,
        age: sql<number[]>`string_to_array(${SurveyTable.target_age}, '-')::int[]`,
        res: AnswersTable.respondentId,
    })
    .from(SurveyTable)
    .leftJoin(AnswersTable,
      sql`${SurveyTable.surveyid} =  ${AnswersTable.surveid} and ${AnswersTable.respondentId} = ${usr}`
    )
    .where(sql`
        ${SurveyTable.status} = 'Live'
        and  
        ${AnswersTable.respondentId} is null
    `)

    let sq =  await db
    .selectDistinctOn([SurveyTable.surveyid], {
        id: SurveyTable.surveyid,
        title: SurveyTable.surveyTitle,
        from: sql<Date>`${SurveyTable.from}::timestamp::date`.as('from'),
        to: sql<Date>`${SurveyTable.to}::timestamp::date`.as('to'),
        age: sql<number[]>`string_to_array(${SurveyTable.target_age}, '-')::int[]`.as('age'),
        res: AnswersTable.respondentId,
    })
    .from(SurveyTable)
    .leftJoin(AnswersTable,
      sql`${SurveyTable.surveyid} =  ${AnswersTable.surveid} and ${AnswersTable.respondentId} = ${usr}`
    )
    .where(sql`
        ${SurveyTable.status} = 'Live'
        and  
        ${AnswersTable.respondentId} is null
        and
        ${SurveyTable.target_gender} = 'any' or ${SurveyTable.target_gender} = ${cur_usr_gen}

    `)
    .as("sq")

    const res = await db
    .select()
    .from(sq)
    .where(
        sql`
        case
            when array_length(${sq.age}, 1) = 1
            then ${sq.age}[1] = ${cur_usr_age}
            else ${cur_usr_age} >= ${sq.age}[1] and ${cur_usr_age} <= ${sq.age}[2]
        end
        `
    )
    
    // console.log(res)
    const live_surv = res//livesurveys //if not filtering

    return {
            live_surv  
    }
}