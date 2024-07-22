import { db } from '$lib/server/db';
import { surveyqnsTableV2 } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params, cookies}) => {

    const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
    let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
    const uri = `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`

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