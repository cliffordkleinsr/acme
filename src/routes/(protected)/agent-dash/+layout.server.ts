import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/helperFunctions/helpers';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { agentData, agentSurveysTable, AnswersTable, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({locals :{user}, cookies, url}) => {
    if (!user) {
        redirect(302, handleLoginRedirect('/agent/signin', url))
        // redirect('/respondent/signin', {type: "error", message:"You Must Be logged In to view this page"}, cookies)
    }
    if (user.role === "CLIENT") {
        redirect(302, handleLoginRedirect('/', url, "Not Authorised"))
    }

    const dat = await db
        .select({
        week: sql<Date>`DATE_TRUNC('week', ${AnswersTable.updatedAt})`,
        count: sql<number>`COUNT(*)`
        })
        .from(AnswersTable)
        .leftJoin(agentSurveysTable, sql`${AnswersTable.surveid} = ${agentSurveysTable.surveyid}`)
        .where(sql`${AnswersTable.agentId} = ${user.id} and ${agentSurveysTable.survey_completed} = true`)
        .groupBy(sql`DATE_TRUNC('week', ${AnswersTable.updatedAt})`)
        .orderBy(sql`DATE_TRUNC('week', ${AnswersTable.updatedAt})`);
    const [tot_points] = await db
        .select({
            pts: agentData.total_pts_earned,
            pds: agentData.total_pts_paid,
            pybl:agentData.total_points_payable
        })
        .from(agentData)
        .where(eq(agentData.agentid, user.id))
    const cum_surveys = await db
        .select({
            id: agentSurveysTable.surveyid
        })
        .from(agentSurveysTable)
        .where(sql`${agentSurveysTable.survey_completed} = true and ${agentSurveysTable.agentid} = ${user.id}`)
    return {
        history:dat,
        total_points: tot_points.pts,
        total_paid: tot_points.pds,
        total_payable: tot_points.pybl,
        cumulative: cum_surveys.length,
        url: url.pathname, 
        AuthedUser: user.fullname,    
    }
}