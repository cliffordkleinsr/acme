import { agentData, UsersTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({params}) => {
    const [agent] = await db
    .select({
        name: UsersTable.fullname,
        email: agentData.email,
        phone: agentData.phone,
        age: UsersTable.age
    })
    .from(agentData)
    .leftJoin(UsersTable, eq(agentData.agentid, UsersTable.id))
    .where(eq(agentData.agentid, params.agentid))

    return {
        agent
    }
};