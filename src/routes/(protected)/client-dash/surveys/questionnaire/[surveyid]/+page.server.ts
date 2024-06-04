import { db } from '$lib/server/db'
import { SurveyQnsTable, SurveyTable } from '$lib/server/schema'
import { eq, asc } from 'drizzle-orm'
import type { Actions, PageServerLoad } from './$types'
import { addSurveyQuestions } from '$lib/server/db_utils'
import { fail } from '@sveltejs/kit'

export const load: PageServerLoad = async ({params}) => {
    const data = await db
    .select({
        title:SurveyTable.surveyTitle,
        desc: SurveyTable.surveyDescription
    })
    .from(SurveyTable)
    .where(eq(SurveyTable.surveyid , params.surveyid))

    const questions = await db
            .select({
                id: SurveyQnsTable.questionId,
                question: SurveyQnsTable.question,
                question_type: SurveyQnsTable.questionT,
                option1: SurveyQnsTable.option1,
                option2: SurveyQnsTable.option2,
                option3: SurveyQnsTable.option3
            })
            .from(SurveyQnsTable)
            .where(eq(SurveyQnsTable.surveid, params.surveyid))
            .orderBy(asc(SurveyQnsTable.questionId))

    const surveyqns =  questions.map(qns => ({
        id: qns.id,
        question: qns.question,
        question_type: qns.question_type,
        options: [
            {name: qns.option1 as string},
            {name: qns.option2 as string},
            {name: qns.option3 as string}
        ]
    })) 
    return {
        surveydata: data,
        surveyqns
    }
}

export const actions: Actions = {
    addSingleQns: async({request, params}) =>{
        type Entry = {
            question: string
        }
        const data = Object.fromEntries(await request.formData()) as Entry
        const { question } = data

        try 
        {
            await addSurveyQuestions({
                surveid: params.surveyid,
                question: question
            })

        } catch (err) 
        {
            console.error(err)
        }
    },

    addMultiQns: async ({ request, params }) => {
        type Entry = {
            question: string
            option_0: string 
            option_1: string
            option_2: string
        }
        const data = Object.fromEntries(await request.formData()) as Entry
        const {question, option_0, option_1, option_2} = data

        
        try 
        {
            if (option_2 === '') {
                await addSurveyQuestions({
                    surveid: params.surveyid,
                    question: question,
                    option1: option_0,
                    option2: option_1,
                    questionT: 'Optional'
                })
            } else {
                await addSurveyQuestions({
                    surveid: params.surveyid,
                    question: question,
                    option1: option_0,
                    option2: option_1,
                    option3: option_2,
                    questionT: 'Optional'
                })
            }
            
        } catch (err) 
        {
            console.error(err)
        }
    },

    deleteSurvQns: async ({request}) => {
        type EntryId = {
            questionId: string
        }
        const data = Object.fromEntries(await request.formData()) as EntryId

        const{ questionId } = data

        try 
        {
            await db.delete(SurveyQnsTable).where(eq(SurveyQnsTable.questionId, questionId))
        
        } catch (err) 
        {
            
        }
    },
    editSurvQns: async ({request}) =>{
        type Entry = {
            questionId: string
            question: string
            option1: string 
            option2: string
            option3: string
        }
        const data = Object.fromEntries(await request.formData()) as Entry
        const{ question, questionId, option1, option2, option3} = data

        // // validate
        if (question.length === 0) {
            return fail(404, {message: 'Question cannot be null'})
        }
        try 
        {
            const updateData = {
                question,
                option1: option1 === '' ? null : option1,
                option2: option2 === '' ? null : option2,
                option3: option3 === '' ? null : option3,
              };
              
              await db.update(SurveyQnsTable)
                .set(updateData)
                .where(eq(SurveyQnsTable.questionId, questionId))
        } catch (err) 
        {
            console.error(err)
        }
        
    },
   
}