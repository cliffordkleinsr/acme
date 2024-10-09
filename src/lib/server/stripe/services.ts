import { Stripe } from 'stripe';
import { stripe } from './stripe';
import { BASE_DEV, BASE_PROD } from '$env/static/private';
import { dev } from '$app/environment';

let BASE = BASE_PROD;
if (dev) {
	BASE = BASE_DEV;
}

const subscribe = async (priceId: string): Promise<Stripe.Checkout.Session | undefined> => {
	try {
		const sess = await stripe.checkout.sessions.create({
			ui_mode: 'embedded',
			line_items: [
				{
					price: priceId as string,
					quantity: 1
				}
			],
			mode: 'subscription',
			return_url: `${BASE}/client-dash/subscriptions/subscribed?session_id={CHECKOUT_SESSION_ID}`
		});
		return sess;
	} catch (err) {
		console.error(err);
	}
};

const getSession = async (sessionId: string): Promise<Stripe.Checkout.Session | undefined> => {
	try {
		return await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['subscription']
		});
	} catch (err) {
		console.error(err);
	}
};
export { subscribe, getSession };
