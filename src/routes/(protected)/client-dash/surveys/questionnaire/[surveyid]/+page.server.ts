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
            .select()
            .from(SurveyQnsTable)
            .where(eq(SurveyQnsTable.surveid, params.surveyid))
            .orderBy(asc(SurveyQnsTable.updatedAt))

    const surveyqns =  questions.map(qns => ({
        id: qns.questionId,
        question: qns.question,
        question_type: qns.questionT,
        options: [
            {name: qns.option1 as string},
            {name: qns.option2 as string},
            {name: qns.option3 as string},
            {name: qns.option4 as string},
            {name: qns.option5 as string},
            {name: qns.option6 as string},
            {name: qns.option7 as string}
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
            option_3: string
            option_4: string
            option_5: string
            option_6: string
        }
        const data = Object.fromEntries(await request.formData()) as Entry
        const {
             question, option_0, option_1, option_2,
             option_3, option_4, option_5, option_6,
            } = data

        
        try 
        {
            await addSurveyQuestions({
                surveid: params.surveyid,
                question: question,
                option1: option_0 === '' ? null : option_0,
                option2: option_1 === '' ? null : option_1,
                option3: option_2 === '' ? null : option_2,
                option4: option_3 === '' ? null : option_3,
                option5: option_4 === '' ? null : option_4,
                option6: option_5 === '' ? null : option_5,
                option7: option_6 === '' ? null : option_6,
                questionT: "Multiple"
            })
            
        } catch (err) 
        {
            console.error(err)
        }
    },

    addOptQns: async ({request, params}) => {
        type Entry = {
            question: string
            option_0: string 
            option_1: string
            option_2: string
            option_3: string
            option_4: string
            option_5: string
            option_6: string
        }
        const data = Object.fromEntries(await request.formData()) as Entry
        const {
            question, option_0, option_1, option_2,
            option_3, option_4, option_5, option_6,
           } = data

        try 
           {
               await addSurveyQuestions({
                   surveid: params.surveyid,
                   question: question,
                   option1: option_0 === '' ? null : option_0,
                   option2: option_1 === '' ? null : option_1,
                   option3: option_2 === '' ? null : option_2,
                   option4: option_3 === '' ? null : option_3,
                   option5: option_4 === '' ? null : option_4,
                   option6: option_5 === '' ? null : option_5,
                   option7: option_6 === '' ? null : option_6,
                   questionT: "Optional"
               })
               
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