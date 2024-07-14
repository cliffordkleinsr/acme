import { stripe } from '$lib/server/stripe/stripe';
import type Stripe from 'stripe';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { subscribe } from '$lib/server/stripe/services';

export const load: PageServerLoad = async ({request}) => {

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
