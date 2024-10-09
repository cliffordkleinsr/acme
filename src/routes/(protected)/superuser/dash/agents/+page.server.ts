import { AnswersTable, UsersTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const agents = await db
		.select({
			id: UsersTable.id,
			name: UsersTable.fullname,
			email: UsersTable.email,
			createdat: sql<Date>`TO_CHAR((${UsersTable.createdAt}::timestamp AT TIME ZONE 'UTC' AT TIME ZONE ${timezone}), 'DD/MM/YYYY HH24:MI:SS')`
		})
		.from(UsersTable)
		.where(sql`${UsersTable.role} = 'AGENT'`);

	const tot = await db.selectDistinctOn([AnswersTable.questionId]).from(AnswersTable);
	return {
		agents,
		total: tot.length
	};
};

export const actions: Actions = {
	deactivate: async ({ request }) => {
		const identifier = Object.fromEntries(await request.formData());
		const { id } = identifier;
		try {
			await db
				.update(UsersTable)
				.set({
					disabled: true
				})
				.where(eq(UsersTable.id, id as string));
		} catch (err) {
			console.error(err);
		}
	}
};
