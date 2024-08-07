// import type { Actions } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { handleLoginRedirect } from '$lib/helperFunctions/helpers';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { clientData, clientPackages, SurveyTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import { checkDate, deleteCUser, getpackageFeatures, retExpiryDate, setpackageExpired } from '$lib/server/db_utils';


export const load: LayoutServerLoad = async ({locals :{user}, cookies, url}) => {
    if (!user) {
        // redirect('/client/signin', {type: "error", message:"You Must Be logged In to view this page"}, cookies)
        redirect(302, handleLoginRedirect('/client/signin', url))
        // console.log(fromUrl)
    }
    if (user.role === "AGENT") {
        redirect(302, handleLoginRedirect('/', url, "Not Authorised"))
    }
    // get client feats
    const features = await getpackageFeatures(user.id)
    let msg = []
    // if they have a plan go a head and check if its expired
    if (features.plan !== null) {
        const expiry_date = await retExpiryDate(user.id)
        const { expiry } = expiry_date
         // to disable plans that have expired
        if(new Date(expiry).setHours(0,0,0,0) === new Date().setHours(0,0,0,0)) {
            const expired = await setpackageExpired(user.id, expiry_date)
            msg.push(expired?.message)
        }
    }
    
    // notifs
    // to disable expired surveys
    const live = await db
    .select({
        sid: SurveyTable.surveyid,
        to: SurveyTable.to,
    })
    .from(SurveyTable)
    .where(eq(SurveyTable.status, "Live"))

    
    
    for (const i of live) {
        const message = await checkDate(i.sid, i.to!, user.id)
        msg.push(message?.message)
    }
   
    
    
    // Features and payment plans
    const [payment] = await db
        .select({
            status : clientData.payment_status,
        })
        .from(clientData)
        .where(sql`${clientData.clientId} = ${user.id}`)

    
    return {
        payment,
        features,
        AuthedUser: user.fullname,
        Role: user.role,
        email: user.email,
        url: url.pathname, 
        notif: msg  
    }
}

