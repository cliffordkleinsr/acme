import { db } from '$lib/server/db'
import { QuestionOptions, SurveyQnsTable, SurveyTable, surveyqnsTableV2 } from '$lib/server/schema'
import { eq, asc, sql } from 'drizzle-orm'
import type { Actions, PageServerLoad } from './$types'
import { addSurveyQuestions, addSurveyQuestionsv2 } from '$lib/server/db_utils'
import { fail } from '@sveltejs/kit'
import { ZodError, z } from 'zod'

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
                id: surveyqnsTableV2.questionId,
                question: surveyqnsTableV2.question,
                question_type: surveyqnsTableV2.questionT,
                optionid: sql<string[]>`ARRAY_AGG(${QuestionOptions.optionId}) AS optionid`,
                options: sql<string[]>`ARRAY_AGG(${QuestionOptions.option}) AS options`
            })
            .from(surveyqnsTableV2)
            .leftJoin(QuestionOptions, eq(surveyqnsTableV2.questionId, QuestionOptions.questionId))
            .where(eq(surveyqnsTableV2.surveid, params.surveyid))
            .groupBy(surveyqnsTableV2.questionId, surveyqnsTableV2.question)
            .orderBy(asc(surveyqnsTableV2.updatedAt))
    // console.log(questions)
    // const surveyqns =  questions.map(qns => ({
    //     id: qns.questionId,
    //     question: qns.question,
    //     question_type: qns.questionT,
    //     options: [
    //         {name: qns.option1 as string},
    //         {name: qns.option2 as string},
    //         {name: qns.option3 as string},
    //         {name: qns.option4 as string},
    //         {name: qns.option5 as string},
    //         {name: qns.option6 as string},
    //         {name: qns.option7 as string}
    //     ]
    // })) 
    return {
        surveydata: data,
        surveyqns: questions
    }
}

const multiZodSchema = z.object({
    option: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'})
})

const editZodSchema = z.object({
    option: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'}),
    id: z
    .string({ required_error: 'Answer is required' })
    .min(2, { message: 'Answer must have atleast 2 characters' })
    .max(500, { message: 'Answer must have a maximum 500 characters'})
})
export const actions: Actions = {
    addSingleQns: async({request, params}) =>{
        type Entry = {
            question: string
        }
        const data = Object.fromEntries(await request.formData()) as Entry
        const { question } = data

        try 
        {
            await addSurveyQuestionsv2({
                surveid: params.surveyid,
                question: question,
            })
            // await addSurveyQuestions({
            //     surveid: params.surveyid,
            //     question: question
            // })

        } catch (err) 
        {
            console.error(err)
        }
    },

    addMultiQns: async ({ request, params }) => {

        const data = await request.formData()
        const qns = data.get("question")
        const quid =  crypto.randomUUID()
        // console.log(data)
        let map: any[] = []

        data.forEach((value, name) => {
            if (name !== "question"){
                map = [...map, { option: value} as {option: string}]
            }
        })

        try {
            // Validate and insert the question once

            await db.insert(surveyqnsTableV2).values({
                questionId: quid,
                surveid: params.surveyid,
                questionT: "Multiple",
                question: qns as string
            })

            // Insert each unique option for the question
            // const uniqueOptions = [...new Set(map.map(item => item.option))];
            for (const insert of map) {
                // Validate the option
                const { option } = multiZodSchema.parse(insert);

                // Insert the option
                await db.insert(QuestionOptions).values({
                    questionId: quid,
                    option: option
                })
            }
            
        } catch (err) {
             
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten()
                return fail(400,{
                    errors
                })
            }
            else {
                console.error(err)
            }
        }

        // type Entry = {
        //     question: string
        //     option_0: string 
        //     option_1: string
        //     option_2: string
        //     option_3: string
        //     option_4: string
        //     option_5: string
        //     option_6: string
        // }
        // const data = Object.fromEntries(await request.formData()) as Entry
        // const {
        //      question, option_0, option_1, option_2,
        //      option_3, option_4, option_5, option_6,
        //     } = data

        
        // try 
        // {
        //     await addSurveyQuestions({
        //         surveid: params.surveyid,
        //         question: question,
        //         option1: option_0 === '' ? null : option_0,
        //         option2: option_1 === '' ? null : option_1,
        //         option3: option_2 === '' ? null : option_2,
        //         option4: option_3 === '' ? null : option_3,
        //         option5: option_4 === '' ? null : option_4,
        //         option6: option_5 === '' ? null : option_5,
        //         option7: option_6 === '' ? null : option_6,
        //         questionT: "Multiple"
        //     })
            
        // } catch (err) 
        // {
        //     console.error(err)
        // }
    },

    addOptQns: async ({request, params}) => {
        const data = await request.formData()
        const qns = data.get('question')

        const quid =  crypto.randomUUID()
        // console.log(data)
        let map: any[] = []

        data.forEach((value, name) => {
            if (name !== "question"){
                map = [...map, { option: value} as {option: string}]
            }
        })

        try {
            // Validate and insert the question once

            await db.insert(surveyqnsTableV2).values({
                questionId: quid,
                surveid: params.surveyid,
                questionT: "Optional",
                question: qns as string
            })

            // Insert each unique option for the question
            // const uniqueOptions = [...new Set(map.map(item => item.option))];
            for (const insert of map) {
                // Validate the option
                const { option } = multiZodSchema.parse(insert);

                // Insert the option
                await db.insert(QuestionOptions).values({
                    questionId: quid,
                    option: option
                })
            }
        } catch (err) {

            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten()
                return fail(400,{
                    errors
                })
            }
            else {
                console.error(err)
            }
        }
        // type Entry = {
        //     question: string
        //     option_0: string 
        //     option_1: string
        //     option_2: string
        //     option_3: string
        //     option_4: string
        //     option_5: string
        //     option_6: string
        // }
        // const data = Object.fromEntries(await request.formData()) as Entry
        // const {
        //     question, option_0, option_1, option_2,
        //     option_3, option_4, option_5, option_6,
        //    } = data

        // try 
        //    {
        //        await addSurveyQuestions({
        //            surveid: params.surveyid,
        //            question: question,
        //            option1: option_0 === '' ? null : option_0,
        //            option2: option_1 === '' ? null : option_1,
        //            option3: option_2 === '' ? null : option_2,
        //            option4: option_3 === '' ? null : option_3,
        //            option5: option_4 === '' ? null : option_4,
        //            option6: option_5 === '' ? null : option_5,
        //            option7: option_6 === '' ? null : option_6,
        //            questionT: "Optional"
        //        })
               
        //    } catch (err) 
        //    {
        //        console.error(err)
        //    }
    },
    addStarQns: async ({request, params}) => {
        type Entry = {
            question: string
        }
        const data = Object.fromEntries(await request.formData()) as Entry
        const { question } = data

        try 
        {
            await addSurveyQuestionsv2({
                surveid: params.surveyid,
                questionT: "Rating",
                question: question,
            })
            // await addSurveyQuestions({
            //     surveid: params.surveyid,
            //     question: question
            // })

        } catch (err) 
        {
            console.error(err)
        }
    },
    addLikQns: async({request, params}) => {
        type Entry = {
            question: string
        }
        const data = Object.fromEntries(await request.formData()) as Entry
        const { question } = data

        try 
        {
            await addSurveyQuestionsv2({
                surveid: params.surveyid,
                questionT: "Likert",
                question: question,
            })
            // await addSurveyQuestions({
            //     surveid: params.surveyid,
            //     question: question
            // })

        } catch (err) 
        {
            console.error(err)
        }
    },
    addRnkQns: async({request, params}) => {
        const data = await request.formData()
        const qns = data.get("question")
        const quid =  crypto.randomUUID()
        // console.log(data)
        let map: any[] = []

        data.forEach((value, name) => {
            if (name !== "question"){
                map = [...map, { option: value} as {option: string}]
            }
        })

        try {
            // Validate and insert the question once

            await db.insert(surveyqnsTableV2).values({
                questionId: quid,
                surveid: params.surveyid,
                questionT: "Ranking",
                question: qns as string
            })

            // Insert each unique option for the question
            // const uniqueOptions = [...new Set(map.map(item => item.option))];
            for (const insert of map) {
                // Validate the option
                const { option } = multiZodSchema.parse(insert);

                // Insert the option
                await db.insert(QuestionOptions).values({
                    questionId: quid,
                    option: option
                })
            }
            
        } catch (err) {
             
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten()
                return fail(400,{
                    errors
                })
            }
            else {
                console.error(err)
            }
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
            await db.delete(surveyqnsTableV2).where(eq(surveyqnsTableV2.questionId, questionId))
        
        } catch (err) 
        {
            
        }
    },
    editSurvQns: async ({request}) =>{
        const data = await request.formData()
        const qns = data.get("question")  as string
        const qid = data.get('questionId') as string
        // console.log(data)
        let map: string | any[] = []
        data.forEach((value, name) => {
            if (name === 'option') {
                map = [...map, {option: value} as {option: string}]
            }
            else if (name === 'optionId') {
                const lastItem = map[map.length - 1];
                lastItem.id = value;
            }
        })
        try 
        {
            await db
            .update(surveyqnsTableV2)
            .set({
                question: qns
            })
            .where(eq(surveyqnsTableV2.questionId, qid))

            for (const insert of map) {
                const { option, id } = editZodSchema.parse(insert)
                // console.log(id, option)
                await db
                .update(QuestionOptions)
                .set({
                    option: option
                })
                .where(eq(QuestionOptions.optionId, id))
                
            }
        } catch (err) 
        {
            
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten()
                return fail(400,{
                    errors
                })
            }
            else {
                console.error(err)
            }
        }
    //     type Entry = {
    //         questionId: string
    //         question: string
    //         option1: string 
    //         option2: string
    //         option3: string
    //     }
    //     const data = Object.fromEntries(await request.formData()) as Entry
    //     const{ question, questionId, option1, option2, option3} = data

    //     // // validate
    //     if (question.length === 0) {
    //         return fail(404, {message: 'Question cannot be null'})
    //     }
    //     try 
    //     {
    //         const updateData = {
    //             question,
    //             option1: option1 === '' ? null : option1,
    //             option2: option2 === '' ? null : option2,
    //             option3: option3 === '' ? null : option3,
    //           };
              
    //           await db.update(SurveyQnsTable)
    //             .set(updateData)
    //             .where(eq(SurveyQnsTable.questionId, questionId))
    //     } catch (err) 
    //     {
    //         console.error(err)
    //     }
        
    },
    deleteOpt: async({request}) => {
        const data = Object.fromEntries(await request.formData())
        const {optionId} = data

        try 
        {
            await db
            .delete(QuestionOptions)
            .where(eq(QuestionOptions.optionId, optionId as string))
        } catch (err) 
        {
            console.error(err)
        }
    }
   
}