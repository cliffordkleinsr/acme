import { db } from '$lib/server/db';
import { payoutRequests, UsersTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const payment_requests = await db
        .select({
            id: payoutRequests.payoutid,
            name: UsersTable.fullname,
            status: payoutRequests.status,
            amount:payoutRequests.payout,
            requestedat: sql`TO_CHAR((${payoutRequests.createdAt}::timestamp AT TIME ZONE 'UTC' AT TIME ZONE ${timezone}), 'DD/MM/YYYY HH24:MI:SS')`
        })
        .from(payoutRequests)
        .leftJoin(UsersTable, eq(payoutRequests.agentid, UsersTable.id))

    return {
        payment_requests
    }
    
};
export const actions: Actions = {
    default: async ({request}) => {
        const data = Object.fromEntries(await request.formData())

        // console.log(data)
    }
};