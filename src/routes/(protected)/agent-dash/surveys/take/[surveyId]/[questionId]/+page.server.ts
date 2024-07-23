import { db } from '$lib/server/db';
import { AnswersTable, QuestionOptions, SurveyTable, progressTable, surveyqnsTableV2 } from '$lib/server/schema';
import { eq, asc, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError, z } from "zod";
import { getpersistentIx, questionCount, getsurveyQuestions, insertprogressData, selectProgressData, setTarget, deleteProgressData, updateprogressData } from '$lib/server/db_utils';
import { handleLoginRedirect } from '$lib/helperFunctions/helpers';

const questionZodSchema = z.object({
    answer: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'})
})
const rateZodSchema = z.object({
    answer: z
        .string({ required_error: 'Option is required' })
        .min(1, { message: 'Option is required' })
})
const rankansZodSchema = z.object({
    id: z
        .string({ required_error: 'id is required' })
        .min(1, { message: 'id is required' }),
    option: z
        .string({ required_error: 'Option is required' })
        .min(2, { message: 'Option must have atleast 2 characters' })
        .max(500, { message: 'Option must have a maximum 500 characters'}),
})
const optionalansZodSchema = z.object({
    answer: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'}),
    id: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'})
})
export const load: PageServerLoad = async ({params, cookies, locals:{user}, url}) => {
    // curr
    if (!user) {
        redirect(302, handleLoginRedirect('/agent/signin', url))
        // redirect('/respondent/signin', {type: "error", message:"You Must Be logged In to view this page"}, cookies)
    }
    const surveyqns = await getsurveyQuestions(params.questionId)

    // for percentages
    const ids = await questionCount(params.surveyId)
    
    let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
    if (current_ix === 0) {
        current_ix  = await getpersistentIx(user?.id!, params.surveyId)
    }
    const sq = await selectProgressData(user?.id!, params.surveyId)
    if (sq.length  === 0) {
        await insertprogressData({
            agentid: user?.id as string,
            current_ix:current_ix,
            surveyid:params.surveyId
        })
    }
    return {
        count: current_ix,
        questions: surveyqns[0],
        question_cnt: ids.length
    }
}

export const actions: Actions = {
    defaultAns: async ({request, params, cookies, locals}) => {
        const data = await request.formData()
        // console.log(data)
        let map: any[] = []
        data.forEach(element => {
            map = [...map, {answer: element} as {answer: string}]
            
        })
        // console.log(map)
        const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
        
        let current_ix = parseInt(cookies.get('current_ix') ?? '0')
        if (current_ix === 0) {
            current_ix  = await getpersistentIx(locals.user?.id!, params.surveyId)
        }
        // await db.delete(AnswersTable).where(eq(AnswersTable.questionId, params.questionId))
        // try 
        // {
        //     // validate
        //     for (const element of map) {
        //         const { answer } = questionZodSchema.parse(element);
        //         await db.insert(AnswersTable).values({
        //             questionId: params.questionId,
        //             surveid: params.surveyId,
        //             answer: answer,
        //             agentId: locals.session?.userId as string
        //         });
        //     }
            
            

        // } catch (err) 
        // {
            
        //     if (err instanceof ZodError) {
        //         const { fieldErrors: errors } = err.flatten()
        //         return fail(400,{
        //             errors
        //         })
        //     }
        //     else {
        //         console.error(err)
        //     }
        // }
        // Dynamic routing with incremental counter
         
         if (current_ix < ids.length -1) {
            current_ix++;
            // Set the updated current_ix in the cookie
            cookies.set('current_ix', current_ix.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5, // expires after 5 mins
            })
            await updateprogressData(locals.user?.id!, params.surveyId, current_ix)
            redirect(303, `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`);
        } else {
            // If there are no more IDs, redirect to a different route or perform any other desired action
            cookies.set('current_ix', '0', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0, // Expire the cookie immediately
            })
            // clear the persistent index also
            await deleteProgressData(locals.user?.id!, params.surveyId)
            // set the new target since this guy cant do the survey again
            await setTarget(params.surveyId)
            //then redirect
            redirect(303, '/agent-dash/surveys/complete')
        }
    },
    addOptAns: async({request, cookies, params, locals}) => {
        const data = await request.formData()
        // console.log(data)
        let map:any[] = []
        data.forEach((value, name) => {
            if (name === 'optionId') {
               map.push({id: value}) 
            }
            else if (name === 'answer') {
                const lastItem = map[map.length - 1];
                lastItem.answer = value;
            }
        })
        const filtered = map.filter(obj => obj.hasOwnProperty('answer'))

        const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
        
        let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
        if (current_ix === 0) {
            current_ix  = await getpersistentIx(locals.user?.id!, params.surveyId)
        }
        // await db.delete(AnswersTable).where(eq(AnswersTable.questionId, params.questionId))
        // try 
        // {
        //     for (const insert of filtered) {
        //         //validate
        //         const { answer, id} = optionalansZodSchema.parse(insert)
        //         await db
        //         .insert(AnswersTable)
        //         .values({
        //             questionId: params.questionId,
        //             surveid: params.surveyId,
        //             optionId: id,
        //             answer: answer,
        //             agentId: locals.session?.userId as string
        //         })

        //     }
            
        // } catch (err) 
        // {
        //     if (err instanceof ZodError) {
        //         const { fieldErrors: errors } = err.flatten()
        //         return fail(400,{
        //             errors
        //         })
        //     }
        //     else {
        //         console.error(err)
        //     }
        // }
        // Dynamic routing with incremental counter
         
         if (current_ix < ids.length -1) {
            current_ix++;
            // Set the updated current_ix in the cookie
            cookies.set('current_ix', current_ix.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5, // expires after 5 mins
            });
            // update the persistent index
            await updateprogressData(locals.user?.id!, params.surveyId, current_ix)
            redirect(303, `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`);
        } else {
            // If there are no more IDs, redirect to a different route or perform any other desired action
            cookies.set('current_ix', '0', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0, // Expire the cookie immediately
            });
            // set the new target since this guy cant do the survey again
            // clear the persistent index also
            await deleteProgressData(locals.user?.id!, params.surveyId)
            await setTarget(params.surveyId)
            //then redirect
            redirect(303, '/agent-dash/surveys/complete');
        }
    },
    addRankAns: async ({request, params, cookies, locals}) => {
        const data = await request.formData()
        
        let map: string | any[] = []
        data.forEach((value, name) => {
            // console.log(element)
            if (name === 'rankId') {
               map.push({id : value}) 
            }
            else if (name === 'option') {
                const lastItem = map[map.length - 1];
                lastItem.option = value;
            }
        })

        const filtered = map.filter(obj => obj.hasOwnProperty("option"))
        const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
        
        let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
        if (current_ix === 0) {
            current_ix  = await getpersistentIx(locals.user?.id!, params.surveyId)
        }
        // await db.delete(AnswersTable).where(eq(AnswersTable.questionId, params.questionId))
        // try 
        // {
            
        //     for (const insert of filtered) {
        //         //validate
        //         const {id, option } = rankansZodSchema.parse(insert)
        //         await db
        //         .insert(AnswersTable)
        //         .values({
        //             questionId: params.questionId,
        //             surveid: params.surveyId,
        //             rankId: id,
        //             answer: option,
        //             agentId: locals.session?.userId as string
        //         })

        //     }
            
        // } catch (err) 
        // {
        //     if (err instanceof ZodError) {
        //         const { fieldErrors: errors } = err.flatten()
        //         return fail(400,{
        //             errors
        //         })
        //     }
        //     else {
        //         console.error(err)
        //     }
        // }
        // Dynamic routing with incremental counter
         if (current_ix < ids.length -1) {
            current_ix++;
            // Set the updated current_ix in the cookie
            cookies.set('current_ix', current_ix.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5, // expires after 5 mins
            });
            // update the persistent index
            await updateprogressData(locals.user?.id!, params.surveyId, current_ix)
            redirect(303, `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`);
        } else {
            // If there are no more IDs, redirect to a different route or perform any other desired action
            cookies.set('current_ix', '0', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0, // Expire the cookie immediately
            });
            // clear the persistent index also
            await deleteProgressData(locals.user?.id!, params.surveyId)
            // set the new target since this guy cant do the survey again
            await setTarget(params.surveyId)
            //then redirect
            redirect(303, '/agent-dash/surveys/complete');
        }
    },
    addRatAns: async ({request, params, cookies, locals}) => {
        const data = await request.formData()
        // console.log(data)
        let map: any[] = []
        data.forEach(element => {
            map = [...map, {answer: element} as {answer: string}]
            
        })
        // console.log(map)

        const ids = await db
            .select({
                id:surveyqnsTableV2.questionId
            })
            .from(surveyqnsTableV2)
            .where(
                eq(surveyqnsTableV2.surveid, params.surveyId)
            )
        
        let current_ix =  parseInt(cookies.get('current_ix') ?? '0')
        if (current_ix === 0) {
            current_ix  = await getpersistentIx(locals.user?.id!, params.surveyId)
        }
        // await db.delete(AnswersTable).where(eq(AnswersTable.questionId, params.questionId))
        // try 
        // {
        //     // validate
        //     for (const element of map) {
        //         const { answer } = rateZodSchema.parse(element);
        //         await db.insert(AnswersTable).values({
        //             questionId: params.questionId,
        //             surveid: params.surveyId,
        //             answer: answer,
        //             agentId: locals.session?.userId as string
        //         });
        //     }

        // } catch (err) 
        // {
            
        //     if (err instanceof ZodError) {
        //         const { fieldErrors: errors } = err.flatten()
        //         return fail(400,{
        //             errors
        //         })
        //     }
        //     else {
        //         console.error(err)
        //     }
        // }
        // Dynamic routing with incremental counter
         
         if (current_ix < ids.length -1) {
            current_ix++;
            // Set the updated current_ix in the cookie
            cookies.set('current_ix', current_ix.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 5, // expires after 5 mins
            });
            // update the persistent index
            await updateprogressData(locals.user?.id!, params.surveyId, current_ix)
            redirect(303, `/agent-dash/surveys/take/${params.surveyId}/${ids[current_ix].id}`)
        } else {
            // If there are no more IDs, redirect to a different route or perform any other desired action
            cookies.set('current_ix', '0', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0, // Expire the cookie immediately
            })
            // clear the persistent index also
            await deleteProgressData(locals.user?.id!, params.surveyId)
            // set the new target since this guy cant do the survey again
            await setTarget(params.surveyId)
            //then redirect
            redirect(303, '/agent-dash/surveys/complete')
        }
    },
}