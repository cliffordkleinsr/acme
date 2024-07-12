import { db } from '$lib/server/db';
import { clientData, clientPackages } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { Phone } from 'lucide-svelte';

export const load: PageServerLoad = async ({locals}) => {
    const [client_pack] = await db
        .select({
            packageid:clientPackages.packageid,
            desc: clientPackages.packageDesc,
            plan: clientPackages.package_price,
            qns: clientPackages.max_questions,
            surv: clientPackages.max_surv,
            agents: clientPackages.max_agents,
            count: clientData.county,
            Phone:clientData.phone,
            at: clientData.processed_at
        })
        .from(clientData)
        .leftJoin(clientPackages, sql`${clientPackages.packageid} = ${clientData.packageid}`)
        .where(sql`${clientData.clientId} = ${locals.session?.userId}`)

    return {
        client_pack
    }
}
