// import type { Actions } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { handleLoginRedirect } from '$lib/helperFunctions/helpers';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { clientData, clientPackages, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import { checkDate } from '$lib/server/db_utils';


export const load: LayoutServerLoad = async ({locals :{user}, cookies, url}) => {
    if (!user) {
        // redirect('/client/signin', {type: "error", message:"You Must Be logged In to view this page"}, cookies)
        redirect(302, handleLoginRedirect('/client/signin', url))
        // console.log(fromUrl)
    }
    if (user.role === "RESP") {
        redirect(302, handleLoginRedirect('/respondent-dash', url, "Not Authorised"))
    }
    
    const live = await db
    .select({
        sid: SurveyTable.surveyid,
        to: SurveyTable.to,
    })
    .from(SurveyTable)
    .where(eq(SurveyTable.status, "Live"))

    let msg = []
    for (const i of live) {
        const message = await checkDate(i.sid, i.to!)
        msg.push(message?.message)
    }

    const [payment] = await db
        .select({
            status : clientData.payment_status,
        })
        .from(clientData)
        .where(sql`${clientData.clientId} = ${user.id}`)

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
    return {
        payment,
        features:feats,
        AuthedUser: user.fullname,
        Role: user.role,
        email: user.email,
        url: url.pathname, 
        notif: msg  
    }
}

