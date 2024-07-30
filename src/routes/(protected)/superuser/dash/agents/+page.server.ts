import { AnswersTable, UsersTable } from '$lib/server/schema';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
    const agents = await db
        .select({
            id: UsersTable.id,
            name: UsersTable.fullname,
            email: UsersTable.email,
            role: UsersTable.role
        })
        .from(UsersTable)
        .where(sql`${UsersTable.role} = 'AGENT'`)
    
        const tot = await db
            .selectDistinctOn([AnswersTable.questionId])
            .from(AnswersTable)
    return {
        agents,
        total: tot.length
    }
};