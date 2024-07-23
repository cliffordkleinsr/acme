import { db } from '$lib/server/db';
import { progressTable, surveyqnsTableV2 } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params, cookies, locals:{user}}) => {
    let uri:string = ''
    const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
    let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
    const [persistent] = await db
        .select({ix :progressTable.current_ix})
        .from(progressTable)
        .where(
            sql
            `${progressTable.agentid} = ${user?.id!}
             and 
             ${progressTable.surveyid} = ${params.surveyId}`
        )
    let persisted_ix:number = 0
    // first check whether we have a cookie for the indexed session
    if (current_ix === 0) {
        // if not we check whether we have a persisted index in the database
        // if there is a persisted index in the database return the uri with the index url
        if (persistent) {  
            persisted_ix =  persistent.ix
            uri = `/agent-dash/surveys/take/${params.surveyId}/${ids[persisted_ix].id}`
        }
        // if not  just use the default 0
        else{
            uri = `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`
        } 
        
    }

    const surveyqns = await db
    .select()
    .from(surveyqnsTableV2)
    .where(eq(surveyqnsTableV2.surveid, params.surveyId))
    
    
    return {
        uri,
        current_ix,
        persisted_ix,
        question_cnt: surveyqns.length
    }
}