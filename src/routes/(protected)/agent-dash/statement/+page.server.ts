import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { amountSchema } from './paymt';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { agentData, agentTransactions, payoutRequests } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'sveltekit-flash-message/server';
import { error } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import { SECRETKEY_SERVER_ONLY } from '$env/static/private';
import { paymentRequestreset } from '$lib/server/db_utils';
import { initiateB2C } from '$lib/server/mpesa';
import { deductAmount } from '$lib/helperFunctions/helpers';
const limiter = new RetryAfterRateLimiter({
	IP: [10, 'h'], // IP address limiter
	IPUA: [5, 'm'], // IP + User Agent limiter
	cookie: {
		// Cookie limiter
		name: 'limiterid', // Unique cookie name for this limiter
		secret: SECRETKEY_SERVER_ONLY, // Use $env/static/private
		rate: [2, 'd'],
		preflight: true // Require preflight call (see load function)
	}
});
export const load: PageServerLoad = async (event) => {
	// await paymentRequestreset(event.locals.user?.id!)
	await limiter.cookieLimiter?.preflight(event);
	const {
		locals: { user }
	} = event;
	const [balance] = await db
		.select({
			pts: agentData.total_points_payable
		})
		.from(agentData)
		.where(eq(agentData.agentid, user?.id as string));
	return {
		form: await superValidate(zod(amountSchema)),
		total_payable: balance.pts
	};
};

export const actions: Actions = {
	default: async (event) => {
		const {
			request,
			cookies,
			locals: { user }
		} = event;

		// Rate Limiting
		const status = await limiter.check(event);
		let per = Math.round(status.retryAfter / 3600);
		const form = await superValidate(request, zod(amountSchema));
		// await limiter.clear()
		if (await limiter.isLimited(event))
			return setError(
				form,
				'amount',
				`You are being rate limited. Please try again after ${per} hours.`
			);

		if (!form.valid) {
			return message(form, {
				alertType: 'error',
				alertText: 'Please Check your entries, the form contains invalid data'
			});
		}

		const { amount } = form.data;

		const [agentinfo] = await db
			.select({
				phone: agentData.phone,
				pts: agentData.total_points_payable
			})
			.from(agentData)
			.where(eq(agentData.agentid, user?.id as string));

		// amount can not be more than the balance
		if (amount > agentinfo.pts) {
			return setError(form, 'amount', 'Your account balance is less than the payout');
		}

		try {
			// create a payment request
			let usr = user?.id as string;
			// amounts above 1k must be processed by admin
			if (amount > 1000) {
				await db.insert(payoutRequests).values({
					agentid: usr,
					payout: amount
				});
			}
			// amounts below can be sent out
			else {
				const { phone } = agentinfo;
				const new_amt = deductAmount(amount);
				const body = { amount: new_amt, phoneNumber: phone };
				// console.log(body)
				// const result = await initiateB2C(body)
				// if (result.errorCode) {
				// 	error(404, result.errorCode )
				// }
				// else {
				// append the transaction code
				// await db.insert(agentTransactions).values({
				// 	agentid: usr,
				// 	originatorCID: result.OriginatorConversationID,
				// 	mpesaCID: result.ConversationID,
				// 	amount: amount,
				// })
				// update the payout request
				// await db.insert(payoutRequests).values({
				// 	agentid: usr,
				// 	payout: amount,
				// 	status: 'complete',
				// 	processedby: usr,
				// 	processedAt: new Date()
				// })
				// once complete subtract on the points payable
				// let remnant = agentinfo.pts - amount;
				// await db
				// 	.update(agentData)
				// 	.set({
				// 		total_points_payable: remnant
				// 	})
				// .where(eq(agentData.agentid, usr));
				// }
			}
		} catch (err) {
			console.error(err);

			return message(form, {
				alertType: 'error',
				alertText: 'An Unexpected error occured'
			});
		}
		return message(form, {
			alertType: 'success',
			alertText: 'Payment request submitted successfully'
		});
		// redirect(303, '/agent-dash', { type: "success", message: `Payment request submitted successfully`}, cookies)
	}
};
