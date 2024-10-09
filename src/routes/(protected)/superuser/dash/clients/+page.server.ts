import { db } from '$lib/server/db';
import { clientData, SurveyTable, UsersTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const clients = await db
		.select({
			id: UsersTable.id,
			name: UsersTable.fullname,
			email: UsersTable.email,
			createdat: sql<Date>`TO_CHAR((${UsersTable.createdAt}::timestamp AT TIME ZONE 'UTC' AT TIME ZONE ${timezone}), 'DD/MM/YYYY HH24:MI:SS')`
		})
		.from(UsersTable)
		.where(sql`${UsersTable.role} = 'CLIENT'`);
	const data = await db
		.select({
			id: SurveyTable.surveyid,
			title: SurveyTable.surveyTitle,
			status: SurveyTable.status,
			created: sql<Date>`${SurveyTable.createdAt}::timestamp::date`
		})
		.from(SurveyTable);

	const subs = await db
		.select({
			id: clientData.clientId
		})
		.from(clientData)
		.where(sql`${clientData.payment_status} = True`);
	return {
		clients,
		survs: data,
		subs
	};
};
