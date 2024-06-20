import {eq, getTableColumns, sql } from "drizzle-orm"
import { db } from "./db"
import { 
    AnswersTable,
    SurveyQnsTable,
    SurveyTable,
    UsersTable, clientData,
    emailVerificationCodes,
    respondentData,
    sessionsTable,
    surveyqnsTableV2,
    type ClientDataInsertSchema,
    type RespondentInsertSchema,
    type resData,
    type surveyGenerateSchema,
    type surveyQnsSchema,
    type surveyQnsSchemaV2,
    type surveySelectSchema,
    type userInsertSchema 
} from "./schema"
import type { PgColumn, PgTable } from "drizzle-orm/pg-core"

export const getCountAgents = async (variable: PgColumn, userId:string) => {
    const queryResult = await db
    .select({
        variable,
        agent_cnt: sql<number>`cast(count(distinct(${respondentData.respondentId})) as int)`,
    })
    .from(respondentData)
    .leftJoin(AnswersTable, eq(respondentData.respondentId, AnswersTable.respondentId))
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

export const insertNewUser = async (user: userInsertSchema) => {
    return await db.insert(UsersTable).values(user)
}

export const insertRespData = async (data: RespondentInsertSchema) => {
    return await db.insert(respondentData).values(data)
}

export const insertClientData = async (data: ClientDataInsertSchema) => {
    return await db.insert(clientData).values(data)
}

export const createNewSurvey = async (data: surveyGenerateSchema) => {
    return await db.insert(SurveyTable).values(data)
}

export const addSurveyQuestions = async (data: surveyQnsSchema) => {
    await db.insert(SurveyQnsTable).values(data)
}
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

export const deleteClientUsers = async () => {
     
     await db.delete(sessionsTable)
     await db.delete(clientData)
     await db.delete(UsersTable)
       
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

