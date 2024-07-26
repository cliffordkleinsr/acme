import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { SurveyTable, UsersTable, clientData, clientPackages, sessionsTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import { fail } from 'sveltekit-superforms';
import { lucia } from '$lib/server/auth';
import { redirect } from 'sveltekit-flash-message/server';
import { gender } from '$lib/json';
import type { Time } from '@internationalized/date';

export const load: PageServerLoad = async () => {
    // for now the pricing model doesen't exist so wil just have arbitrary values
    const client_subs = await db
        .select({
            name:sql<string>`${UsersTable.fullname}`,
            email: sql<string>`${UsersTable.email}`,
            amt: sql<string>`
            CASE
                WHEN ${clientData.typeid} = ${clientPackages.priceIdMn} THEN ${clientPackages.package_price_mn}
                WHEN ${clientData.typeid} = ${clientPackages.priceIdYr} THEN ${clientPackages.package_price_yr}
                ELSE '0'
            END
        `
        })
        .from(UsersTable)
        .leftJoin(clientData, eq(UsersTable.id, clientData.clientId))
        .rightJoin(clientPackages, eq(clientData.packageid, clientPackages.packageid))
        .where(sql`${UsersTable.role} = 'CLIENT'`)

    const count_tot = await db
    .select({
        toime: sql<boolean>`${SurveyTable.createdAt} >= date_trunc('week', now())`
    })
    .from(SurveyTable)

    const recent_users = await db
        .select({
            name: UsersTable.fullname,
            email: UsersTable.email,
            role: UsersTable.role,
            gender: sql<string>`${UsersTable.gender}`,
            at : sql<string>`((${sessionsTable.expiresAt}- interval '1 hour')::timestamp at time zone 'UTC+3')::time`
        })
        .from(UsersTable)
        .innerJoin(sessionsTable, eq(UsersTable.id, sessionsTable.userId))
        .where(sql`${sessionsTable.expiresAt}::timestamp >= date_trunc('week',  now()) and ${UsersTable.role} != 'ADMIN'`)
    return {
        recent_users,
        client_subs,
        count_survs : count_tot.length,
        week: count_tot
    }
    
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