// import type { Actions } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { handleLoginRedirect } from '$lib/helperFunctions/helpers';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { SurveyTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
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
    
    return {
        AuthedUser: user.fullname,
        url: url.pathname, 
        notif: msg  
    }
}

