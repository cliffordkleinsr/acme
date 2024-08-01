import { db } from '$lib/server/db';
import { agentSurveysTable, progressTable, surveyqnsTableV2 } from '$lib/server/schema';
import { asc, eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { getpersistentIx } from '$lib/server/db_utils';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({params, cookies, locals:{user}}) => {
    
    let [survey] = await db
        .select({
            completed:agentSurveysTable.survey_completed
        })
        .from(agentSurveysTable)
        .where(sql`${agentSurveysTable.agentid} = ${user?.id} and ${agentSurveysTable.surveyid} = ${params.surveyId}`)
    
    if (survey.completed === true) {
        redirect(303, '/agent-dash')
    }
    let uri:string = ''
    const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
            .orderBy(asc(surveyqnsTableV2.updatedAt))
    // await db.delete(progressTable).where(eq(progressTable.surveyid, "wncpwl3rf3h2zes"))
    let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
    // first check whether we have a cookie for the indexed session
    if (current_ix === 0) {
        // if not we check whether we have a persisted index in the database
        // if there is a persisted index in the database return the uri with the index url
        current_ix = await getpersistentIx(user?.id!, params.surveyId)   
    }
    uri = `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`
    const surveyqns = await db
    .select()
    .from(surveyqnsTableV2)
    .where(eq(surveyqnsTableV2.surveid, params.surveyId))
    
    
    return {
        uri,
        current_ix,
        question_cnt: surveyqns.length
    }
}