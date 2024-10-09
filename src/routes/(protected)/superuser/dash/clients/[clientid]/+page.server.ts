import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { clientData, UsersTable } from '$lib/server/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [client] = await db
		.select({
			name: UsersTable.fullname,
			email: clientData.email,
			phone: clientData.phone,
			age: UsersTable.age
		})
		.from(clientData)
		.leftJoin(UsersTable, eq(clientData.clientId, UsersTable.id))
		.where(eq(clientData.clientId, params.clientid));

	return {
		client
	};
};
