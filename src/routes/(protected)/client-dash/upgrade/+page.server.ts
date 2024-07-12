import { stripe } from '$lib/server/stripe';
import type Stripe from 'stripe';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({request}) => {

};
