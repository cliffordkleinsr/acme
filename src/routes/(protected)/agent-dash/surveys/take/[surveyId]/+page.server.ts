import { db } from '$lib/server/db';
import { SurveyQnsTable, questionZodSchema } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { addSurveyQuestions } from '$lib/server/db_utils';

export const load: PageServerLoad = async ({params}) => {
    const surveyqns = await db
    .select({
        id: SurveyQnsTable.questionId
    })
    .from(SurveyQnsTable)
    .where(eq(SurveyQnsTable.surveid, params.surveyId))
    
    
    return {
        questions: surveyqns,
        question_cnt: surveyqns.length
    }
}