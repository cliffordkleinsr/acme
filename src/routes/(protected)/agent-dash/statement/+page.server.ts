import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from "sveltekit-superforms";
import { amountSchema } from "./paymt";
import { zod } from "sveltekit-superforms/adapters";
import { db } from '$lib/server/db';
import { agentData, payoutRequests } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'sveltekit-flash-message/server';
import { error } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server'
import { SECRETKEY_SERVER_ONLY} from '$env/static/private'
import { paymentRequestreset } from '$lib/server/db_utils';
const limiter = new RetryAfterRateLimiter ({
    IP: [10, 'h'], // IP address limiter
    IPUA: [5, 'm'], // IP + User Agent limiter
    cookie: {
        // Cookie limiter
        name: 'limiterid', // Unique cookie name for this limiter
        secret: SECRETKEY_SERVER_ONLY, // Use $env/static/private
        rate: [2, 'd'],
        preflight: true // Require preflight call (see load function)
      }
})
export const load: PageServerLoad = async (event) => {
    // await paymentRequestreset(event.locals.user?.id!)
    await limiter.cookieLimiter?.preflight(event);
    return {
        form: await superValidate(zod(amountSchema)),
    }
}

export const actions: Actions = {
    default: async (event) => {
        
        const {request, cookies, locals:{user}} = event
        const status = await limiter.check(event)
        let per = Math.round(status.retryAfter/3600)
        const form = await superValidate(request, zod(amountSchema))
        // await limiter.clear()
        if (await limiter.isLimited(event)) return setError(form,
            'amount',
            `You are being rate limited. Please try again after ${per} hours.`
        );

        if (!form.valid) {
            return message(form, {
                alertType:'error',
                alertText:'Please Check your entries, the form contains invalid data'
            })
        }

        const {amount} = form.data
        const [balance] = await db.select({
            pts: agentData.total_points_payable
        })
        .from(agentData)
        .where(eq(agentData.agentid, user?.id as string))
        
        // amount can not be more than the balance
        if (amount > balance.pts) {
            return setError(form,
                'amount',
                'Your account balance is less than the payout'
            )
        }

        try 
        {
            // create a payment request
            let usr = user?.id as string
            await db
            .insert(payoutRequests)
            .values({
                agentid:usr,
                payout: amount,
                createdAt:new Date()
            })
            // subtruct on the points payable
            let remnant = balance.pts - amount
            await db
            .update(agentData)
            .set({
                total_points_payable:remnant
            })
            .where(eq(agentData.agentid, usr))
            


        } catch (err) {
            console.error(err)
            
            return message(form, {
                alertType: 'error',
                alertText: 'An Unexpected error occured'
            })
        }
        return message(form, {
            alertType:'success',
            alertText:'Payment request submitted successfully'
        })
        // redirect(303, '/agent-dash', { type: "success", message: `Payment request submitted successfully`}, cookies)
    }
};