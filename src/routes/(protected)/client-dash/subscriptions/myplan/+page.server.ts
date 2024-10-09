import { db } from '$lib/server/db';
import { clientData } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/helperFunctions/helpers';

export const load: PageServerLoad = async ({ locals, url }) => {
	const [paid] = await db
		.select({
			payment_status: clientData.payment_status
		})
		.from(clientData)
		.where(eq(clientData.clientId, locals.user?.id!));

	if (paid.payment_status === false) {
		redirect(303, handleLoginRedirect('/client-dash/plans', url, 'Subscribe to view your plans'));
	}
};
