import {asc, eq, sql } from "drizzle-orm"
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
    progressTable,
    agentSurveysTable,
    payoutRequests
} from "./schema"
import type { PgColumn, PgTable } from "drizzle-orm/pg-core"
import { clientPackage } from "$lib/store"
import type { RetryAfterRateLimiter } from "sveltekit-rate-limiter/server"


export const deleteCUser = async (userid:string, surveyid:string) => {
    await db.delete(surveyqnsTableV2).where(eq(surveyqnsTableV2.surveid, surveyid))
    await db.delete(SurveyTable).where(eq(SurveyTable.clientid, userid))
    await db.delete(clientData).where(eq(clientData.clientId, userid))
    await db.delete(sessionsTable).where(eq(sessionsTable.userId, userid))
    await db.delete(UsersTable).where(eq(UsersTable.id, userid))
    
}
export const deleteAUser = async ( userid:string) => {
    await db.delete(agentData).where(eq(agentData.agentid, userid))
    await db.delete(sessionsTable).where(eq(sessionsTable.userId, userid))
    await db.delete(UsersTable).where(eq(UsersTable.id, userid))
}
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

export const checkUserRole= async (email:string) => {
    const [queryResult] = await db
    .select({
        email: UsersTable.email,
        role: UsersTable.role
    }).from(
        UsersTable
    ).where(
        eq(UsersTable.email, email)
    )
    
    return queryResult
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

export const addSurveyQuestionsv2 = async (data: surveyQnsSchemaV2) => {
    await db.insert(surveyqnsTableV2).values(data)
}

export const deleteSurvey = async (surveyid:string) => {
    await db.delete(agentSurveysTable).where(eq(agentSurveysTable.surveyid , surveyid))
    await db.delete(surveyqnsTableV2).where(eq(surveyqnsTableV2.surveid, surveyid))
    await db.delete(SurveyTable).where(eq(SurveyTable.surveyid, surveyid))  
}

// =========================== Client Package Utilities ==========================

/**
 * returns the expiry date & the package itself
 * @param id 
 * @returns 
 */
export const retExpiryDate = async (id:string) => {
   const [expiry_date] = await db
    .select({
        expiry : sql<Date>`${clientData.expires_at}`,
        packagetype: sql<string>`${clientPackages.packageDesc}`
    })
    .from(clientData)
    .leftJoin(clientPackages, eq(clientData.packageid, clientPackages.packageid))
    .where(eq(clientData.clientId, id))
    return expiry_date
}

/**
 * Checks whether a surveys to date has reached and closes the survey
 * @param id 
 * @param fromdb 
 * @returns 
 */
export const checkDate = async (id:string, fromdb: Date, userid:string) => {
    let diff = new Date().getTime() - fromdb.getTime()
    if (diff  > 0) {
        await db.update(SurveyTable).set({
            status:"Closed"
        }).where(sql`${SurveyTable.surveyid} = ${id} and ${SurveyTable.clientid} = ${userid}`)
        return {
            message: `Survey ${id} has been closed`
        }
    }
}

/**
 * Utility to get all features to a package that a client has subscribed to
 * @param id 
 * @returns 
 */
export const getpackageFeatures = async (id: string) => {
    const [feats] = await db
    .select({
        gender_active: clientPackages.demographics,
        ages: clientPackages.ages,
        maxqns: clientPackages.max_questions,
        maxagents: clientPackages.max_agents,
        maxsurv: clientPackages.max_surv,
        plan: clientPackages.package_price_mn,
    })
    .from(clientData)
    .leftJoin(clientPackages, eq(clientData.packageid, clientPackages.packageid))
    .where(eq(clientData.clientId, id))

    return feats
}
/**
 * Utility to analyze whether client package has expired
 * @param id 
 * @returns 
 */
export const setpackageExpired = async (id: string, expiry_date:{expiry:Date, packagetype:string}) => {
    if (expiry_date) {
        let doe = new Date(expiry_date.expiry)
        let diff = new Date().getTime() - doe.getTime()
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
                message: `Your subscription for the ${expiry_date.packagetype} plan has expired. Renew your plan`
            }
        }
        
    }
    
}
/**
 * Utiliy that gets the list of questions from the surveyquestionsV2 table
 * @param surveid 
 * @returns 
 */
export const questionCount = async (surveid:string) => {
    return await db
        .select()
        .from(surveyqnsTableV2)
        .where(
            eq(surveyqnsTableV2.surveid, surveid)
        )
        .orderBy(asc(surveyqnsTableV2.updatedAt))
}

//=========================== Agent Progress Utilities ======================================

/** Utility to insert data into the progressTable
 * 
 * @param data 
 * @returns
 */
export const insertprogressData = async (data:progresType) => {
    return await db.insert(progressTable).values(data)
}

/**
 *  Utility to update the index data in the progressTable
 * @param user 
 * @param surveyid 
 * @param index 
 * @returns 
 */
export const updateprogressData = async (user:string, surveyid:string, index:number) => {
    return await db
        .update(progressTable)
        .set({
            current_ix: index
        })
        .where(
            sql
            `${progressTable.agentid} = ${user}
            and 
            ${progressTable.surveyid} = ${surveyid}`
        )
}
 /**
     * Utility for selecting data from the progress table.
     * It takes in two parameters :
      * @param {string} user
      * @param {string} surveyid 
      * @returns {Array} query
*/
export const selectProgressData = async (user:string , surveyid:string) => {
    return await db
        .select()
        .from(progressTable)
        .where(
            sql
            `${progressTable.agentid} = ${user}
            and 
            ${progressTable.surveyid} = ${surveyid}`
        )
}

/**
 * Utility for deleting data from the progress table.
 * @param user 
 * @param surveyid 
 * @returns 
 */
export const deleteProgressData = async (user:string , surveyid:string) => {
    return await db
        .delete(progressTable)
        .where(
            sql
            `${progressTable.agentid} = ${user}
            and 
            ${progressTable.surveyid} = ${surveyid}`
        )
}

//  When answering qns we want to:
// 1). get the list of all the questions we are answering
// reduce the target when we are answering the last question
// 2). Analyze whether we have a stored index in persistent storage
// 

/**
 * Get a list of all the questions we are answering
 * @param questionId 
 * @returns {Array}
 */
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
/**
 * Analyzes whether we have a stored index in persistent storage
 * @param user 
 * @param surveyid 
 * @returns 
 */
export const getpersistentIx = async (user:string, surveyid:string) => {
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

/**
 * Updates the target once the survey has been completed
 * @param id 
 */
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

/**
 * Utility to complete the survey
 * @param user 
 * @param surveyid 
 * @returns 
 */
export const setsurveyComplete = async (user:string, surveyid:string) => {
    return await db
        .update(agentSurveysTable)
        .set({
            survey_completed:true
        })
        .where(
            sql
            `${agentSurveysTable.agentid} = ${user}
             and 
             ${agentSurveysTable.surveyid} = ${surveyid}`
        )
}
/**
 * Sets the points after survey completion
 * @param user 
 * @param surveyid 
 * @returns 
 */
export const updatesurveyPoints = async (user:string, surveyid:string) => {
    const [curr_pts] = await db
        .select({
            pts: agentData.total_pts_earned
        })
        .from(agentData)
        .where(eq(agentData.agentid, user))
    
    const [to_add] = await db
        .select({
            pts: agentSurveysTable.points
        })
        .from(agentSurveysTable)
        .where(
            sql
            `${agentSurveysTable.agentid} = ${user}
             and 
             ${agentSurveysTable.surveyid} = ${surveyid}`
        )
    const aggregate = curr_pts.pts + to_add.pts

    return await db.update(agentData).set({
        total_pts_earned: aggregate
    }).where(eq(agentData.agentid, user))
}

/**
 * Util to reset all the amounts and rate limits in dev mode
 * @param userid 
 * @param limiter 
 * @returns 
 */
export const paymentRequestreset = async (userid:string) => {
    return await Promise.all([ 
        db.update(agentData).set({
            total_points_payable: 2000
        }).where(eq(agentData.agentid, userid)),

        db.delete(payoutRequests),

    ])
}
