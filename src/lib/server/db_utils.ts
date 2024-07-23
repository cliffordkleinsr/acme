import {asc, eq, getTableColumns, sql } from "drizzle-orm"
import { db } from "./db"
import { 
    AnswersTable,
    // SurveyQnsTable,
    SurveyTable,
    UsersTable, clientData,
    clientPackages,
    emailVerificationCodes,
    agentData,
    sessionsTable,
    surveyqnsTableV2,
    type ClientDataInsertSchema,
    type RespondentInsertSchema,
    type resData,
    type surveyGenerateSchema,
    // type surveyQnsSchema,
    type surveyQnsSchemaV2,
    type surveySelectSchema,
    type userInsertSchema, 
    QuestionOptions,
    type progresType,
    progressTable
} from "./schema"
import type { PgColumn, PgTable } from "drizzle-orm/pg-core"
import { clientPackage } from "$lib/store"

export const getCountAgents = async (variable: PgColumn, userId:string) => {
    const queryResult = await db
    .select({
        variable,
        agent_cnt: sql<number>`cast(count(distinct(${agentData.agentid})) as int)`,
    })
    .from(agentData)
    .leftJoin(AnswersTable, eq(agentData.agentid, AnswersTable.agentId))
    .leftJoin(SurveyTable, eq(AnswersTable.surveid, SurveyTable.surveyid))
    .where(sql`${SurveyTable.clientid} = ${userId}`)
    .groupBy(variable)

    return queryResult
}

export const checkIfEmailExists = async (email:string) => {
    const queryResult = await db
    .select({
        email: UsersTable.email
    }).from(
        UsersTable
    ).where(
        eq(UsersTable.email, email)
    )
    
    return queryResult.length > 0
}

// Insertion for any User
export const insertNewUser = async (user: userInsertSchema) => {
    return await db.insert(UsersTable).values(user)
}
// Insertion for Agent Users
export const insertRespData = async (data: RespondentInsertSchema) => {
    return await db.insert(agentData).values(data)
}
// Insertion for Client Users
export const insertClientData = async (data: ClientDataInsertSchema) => {
    return await db.insert(clientData).values(data)
}
// Insertion for New Survey
export const createNewSurvey = async (data: surveyGenerateSchema) => {
    return await db.insert(SurveyTable).values(data)
}

// export const addSurveyQuestions = async (data: surveyQnsSchema) => {
//     await db.insert(SurveyQnsTable).values(data)
// }
export const addSurveyQuestionsv2 = async (data: surveyQnsSchemaV2) => {
    await db.insert(surveyqnsTableV2).values(data)
}
export const checkDate = async (id:string, fromdb: Date) => {
    let diff = new Date().getTime() - fromdb.getTime()
    if (diff  > 0) {
        await db.update(SurveyTable).set({
            status:"Closed"
        }).where(eq(SurveyTable.surveyid, id))
        return {
            message: `Survey ${id} has been closed`
        }
    }
}

export const packageExpiry = async (id: string) => {
    const [expiry_date] = await db
        .select({
            expiry : clientData.expires_at,
            package: clientPackages.packageDesc
        })
        .from(clientData)
        .leftJoin(clientPackages, eq(clientData.packageid, clientPackages.packageid))
        .where(eq(clientData.clientId, id))
    if (expiry_date.expiry) {
        let diff = new Date().getTime() - expiry_date.expiry?.getTime()
        if (diff  > 0) {
            await db
            .update(clientData)
            .set({
                packageid: null,
                typeid: null,
                payment_status:false,
                expires_at:null
            })
            .where(eq(clientData.clientId, id))
            return {
                message: `Your subscription for the ${expiry_date.package} plan has expired. Renew your plan`
            }
        }
        
    }
    
}

/** 
 * When answering qns we want to
 * 1). get the list of all the questions we are answering
 * reduce the target when we are answering the last question
 * */
export const getsurveyQuestions = async (questionId:string) => {
    return await db
            .select({
                id: surveyqnsTableV2.questionId,
                question: surveyqnsTableV2.question,
                question_type: surveyqnsTableV2.questionT,
                likert_key: surveyqnsTableV2.likertKey,
                optionid: sql<string[]>`ARRAY_AGG(${QuestionOptions.optionId})`,
                options: sql<string[]>`ARRAY_AGG(${QuestionOptions.option})`
            })
            .from(surveyqnsTableV2)
            .leftJoin(QuestionOptions, eq(surveyqnsTableV2.questionId, QuestionOptions.questionId))
            .where(eq(surveyqnsTableV2.questionId, questionId))
            .groupBy(surveyqnsTableV2.questionId, surveyqnsTableV2.question)
            .orderBy(asc(surveyqnsTableV2.updatedAt))
}

export const getpersistentIx = async (user:string , surveyid:string) => {
    let persisted_ix:number = 0
    const [persistent] = await db
        .select({ix :progressTable.current_ix})
        .from(progressTable)
        .where(
            sql
            `${progressTable.agentid} = ${user}
             and 
             ${progressTable.surveyid} = ${surveyid}`
        )
    if (persistent) { 
        persisted_ix = persistent.ix
    }
    return persisted_ix
}

export const setTarget = async (id: string): Promise<void> => {
    try {
        const curr_tgt = await db
            .select({
                target: SurveyTable.target
            })
            .from(SurveyTable)
            .where(eq(SurveyTable.surveyid, id))

        const currTarget = curr_tgt[0].target!
        if (currTarget === undefined) {
            throw new Error('Target not found')
        }

        const new_tgt = currTarget - 1

        await db
            .update(SurveyTable)
            .set({
                target: new_tgt
            })
            .where(eq(SurveyTable.surveyid, id))
    } catch (error) {
        console.error('Error updating target:', error)
    }
};

