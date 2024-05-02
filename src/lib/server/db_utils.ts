import {eq, sql } from "drizzle-orm"
import { db } from "./db"
import { 
    UsersTable, clientData,
    emailVerificationCodes,
    respondentData,
    sessionsTable,
    type ClientDataInsertSchema,
    type RespondentInsertSchema,
    type userInsertSchema 
} from "./schema"



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

export const insertClientpData = async (data: ClientDataInsertSchema) => {
    return await db.insert(clientData).values(data)
}
export const deleteClientUsers = async () => {
     
     await db.delete(sessionsTable)
     await db.delete(clientData)
     await db.delete(UsersTable)
     
    
}