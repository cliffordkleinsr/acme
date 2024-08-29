import { stripe } from '$lib/server/stripe/stripe';
import type Stripe from 'stripe';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { subscribe } from '$lib/server/stripe/services';
import { handleLoginRedirect } from '$lib/helperFunctions/helpers';
import { clientData } from '$lib/server/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({locals, url}) => {
    const [paid] = await db.select({
        payment_status: clientData.payment_status
    })
    .from(clientData)
    .where(eq(clientData.clientId, locals.user?.id!))
    
    if (paid.payment_status) {
        redirect(303, handleLoginRedirect('/client-dash/subscriptions/myplan', url, "You are currently subscribed to a plan"))
    }

    const [onetime] = await db
        .select({
            state: clientData.onetime
        })
        .from(clientData)
        .where(eq(clientData.clientId, locals.user?.id as string))
    
    return {
        otp: onetime.state
    }
};

export const actions: Actions = {
    subscribe : async({request, locals:{user}, cookies}) => {
        const data = Object.fromEntries(await request.formData())
        const { plan, priceId} = data

        const sess = await subscribe(priceId as string)
        if (sess?.client_secret) 
        {
            cookies.set("client_secret", sess.client_secret, {
                path: '/',
                httpOnly: true,
                secure: true
            })
            redirect(303, "/client-dash/subscriptions/checkout")
        }
        redirect(302, '/client-dash/subscriptions/cancel')
    }
};
