import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { UsersTable, sessionsTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import { fail } from 'sveltekit-superforms';
import { lucia } from '$lib/server/auth';
import { redirect } from 'sveltekit-flash-message/server';
import { gender } from '$lib/json';
import type { Time } from '@internationalized/date';

export const load: PageServerLoad = async () => {
    const recent_users = await db
    .select({
        name: UsersTable.fullname,
        email: UsersTable.email,
        role: UsersTable.role,
        gender: UsersTable.gender,
        at : sql<string>`((${sessionsTable.expiresAt}- interval '1 hour')::timestamp at time zone 'UTC+3')::time`
    })
    .from(UsersTable)
    .innerJoin(sessionsTable, eq(UsersTable.id, sessionsTable.userId))
    .where(sql`${sessionsTable.expiresAt}::timestamp >= date_trunc('week',  now()) and ${UsersTable.role} != 'ADMIN'`)

    return {
        recent_users
    }
    // console.log(recent_users)
};

export const actions: Actions = {
    default: async ({locals, cookies}) => {
        if (!locals.session) {
			return fail(401, {message: 'You do not have a valid sesion'});
		}
        await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/", {type: "success", message:"Logged Out"}, cookies)
    }
};