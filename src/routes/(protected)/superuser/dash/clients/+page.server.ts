import { db } from '$lib/server/db';
import { UsersTable } from '$lib/server/schema';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const clients = await db
        .select({
            id: UsersTable.id,
            name: UsersTable.fullname,
            email: UsersTable.email,
            role: UsersTable.role
        })
        .from(UsersTable)
        .where(sql`${UsersTable.role} = 'CLIENT'`)

    return {
        clients
    }
};