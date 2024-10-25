import { db } from '$lib/server/db';
import { agentData, agentTransactions, payoutRequests, UsersTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { toast } from 'svelte-sonner';
import { initiateB2C } from '$lib/server/mpesa';
import { deductAmount } from '$lib/helperFunctions/helpers';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const payment_requests = await db
		.select({
			id: payoutRequests.payoutid,
			name: UsersTable.fullname,
			status: payoutRequests.status,
			amount: payoutRequests.payout,
			requestedat: sql`TO_CHAR((${payoutRequests.createdAt}::timestamp AT TIME ZONE 'UTC' AT TIME ZONE ${timezone}), 'DD/MM/YYYY HH24:MI:SS')`
		})
		.from(payoutRequests)
		.leftJoin(UsersTable, eq(payoutRequests.agentid, UsersTable.id));

	return {
		payment_requests
	};
};
export const actions: Actions = {
	payout: async ({ request, locals: { user } }) => {
		const data = Object.fromEntries(await request.formData());
		const { payoutId } = data;
		try {
			const [agentinfo] = await db
				.select({
					id: agentData.agentid,
					phone: agentData.phone,
					payout: payoutRequests.payout,
					pts: agentData.total_points_payable
				})
				.from(payoutRequests)
				.leftJoin(agentData, eq(payoutRequests.agentid, agentData.agentid))
				.where(eq(payoutRequests.payoutid, payoutId as string));

			const { payout, phone, id, pts } = agentinfo;
			const amount = deductAmount(payout);
			const body = { amount, phoneNumber: phone as string };
			const result = await initiateB2C(body);

			if (result?.errorCode) {
				error(404, result?.errorCode);
			} else {
				// append the transaction code
				await db.insert(agentTransactions).values({
					agentid: id as string,
					originatorCID: result.OriginatorConversationID,
					mpesaCID: result.ConversationID,
					amount: amount
				});
				// update the payout request
				await db.insert(payoutRequests).values({
					agentid: id as string,
					payout: amount,
					status: 'complete',
					processedby: user?.id,
					processedAt: new Date()
				});

				// once complete subtract on the points payable
				let remnant = pts! - amount;
				await db
					.update(agentData)
					.set({
						total_points_payable: remnant
					})
					.where(eq(agentData.agentid, id as string));
			}
		} catch (error) {
			console.error(error);
		}

		// console.log(data)
	},

	decline: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const { payoutId } = data;

		const [agentinfo] = await db
			.select({
				id: agentData.agentid,
				payout: payoutRequests.payout,
				pts: agentData.total_points_payable
			})
			.from(payoutRequests)
			.leftJoin(agentData, eq(payoutRequests.agentid, agentData.agentid))
			.where(eq(payoutRequests.payoutid, payoutId as string));
		const { id, payout, pts } = agentinfo;

		let imbursment = pts! + payout;
		// reimburse
		await db
			.update(agentData)
			.set({
				total_points_payable: imbursment
			})
			.where(eq(agentData.agentid, id as string));

		// decline
		await db
			.update(payoutRequests)
			.set({
				status: 'declined',
				processedAt: new Date()
			})
			.where(eq(payoutRequests.payoutid, payoutId as string));
	}
};
