import { db } from '$lib/server/db';
import { payoutRequests } from '$lib/server/schema';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({locals:{user}}) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const payouts = await db
    .select({
        id: payoutRequests.payoutid,
        payout: payoutRequests.payout,
        status: payoutRequests.status,
        requested: sql`TO_CHAR((${payoutRequests.createdAt}::timestamp AT TIME ZONE 'UTC' AT TIME ZONE ${timezone}), 'DD/MM/YYYY HH24:MI:SS')`,
        processed: sql`TO_CHAR((${payoutRequests.processedAt}::timestamp AT TIME ZONE 'UTC' AT TIME ZONE ${timezone}), 'DD/MM/YYYY HH24:MI:SS')`
    })
    .from(payoutRequests)
    .where(sql`${payoutRequests.agentid} = ${user!.id}`)
    return {
        payouts
    };
}) satisfies PageServerLoad;