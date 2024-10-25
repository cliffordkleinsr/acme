import { flashCookieOptions, loadFlash } from 'sveltekit-flash-message/server';
import type { LayoutServerLoad } from './$types';
import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { SurveyTable } from '$lib/server/schema';
import { sql } from 'drizzle-orm';

flashCookieOptions.secure = false;
export const load: LayoutServerLoad = loadFlash(async () => {
	await lucia.deleteExpiredSessions();

	// CLose expired Surveys
	const live = await db
		.select({
			sid: SurveyTable.surveyid,
			to: SurveyTable.to
		})
		.from(SurveyTable)
		.where(sql`${SurveyTable.status} = 'Live'`);

	for (const items of live) {
		let diff = new Date().getTime() - items.to!.getTime();
		if (diff > 0) {
			await db
				.update(SurveyTable)
				.set({
					status: 'Closed'
				})
				.where(sql`${SurveyTable.surveyid} = ${items.sid}`);
		}
	}
});
