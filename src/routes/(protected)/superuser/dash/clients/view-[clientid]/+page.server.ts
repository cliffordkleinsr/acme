import { db } from '$lib/server/db';
import { clientData, clientPackages, SurveyTable, UsersTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { Client } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
	async function getClient() {
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const [client] = await db
			.select({
				id: UsersTable.id,
				name: UsersTable.fullname,
				email: UsersTable.email,
				phone: clientData.phone,
				company: clientData.companyName,
				// active: clientData.payment_status,
				packagetype: sql`COALESCE(${clientPackages.packageDesc}, 'No Package')`,
				surveys: sql<number>`COALESCE(COUNT(${SurveyTable.surveyid}), 0)::int`
			})
			.from(UsersTable)
			.leftJoin(clientData, eq(clientData.clientId, UsersTable.id))
			.leftJoin(SurveyTable, eq(UsersTable.id, SurveyTable.clientid))
			.leftJoin(clientPackages, eq(clientData.packageid, clientPackages.packageid))
			.where(sql`${UsersTable.role} = 'CLIENT' AND ${UsersTable.id} = ${params.clientid}`)
			.groupBy(
				UsersTable.id,
				UsersTable.fullname,
				UsersTable.email,
				clientData.phone,
				UsersTable.gender,
				UsersTable.age,
				clientPackages.packageDesc,
				// clientData.payment_status,
				clientData.companyName
			);

		const data = { clients: client };
		return data as Client;
	}

	return await getClient();
};
