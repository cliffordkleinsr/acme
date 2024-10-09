import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { clientData, emailVerification, UsersTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	if (!user) redirect(302, '/client/signin');
	const email = user.email;
	const [res] = await db
		.select()
		.from(emailVerification)
		.where(eq(emailVerification.userId, user.id));
	if (res.verified) {
		redirect(302, '/client/signin');
	}
	return {
		email
	};
};
