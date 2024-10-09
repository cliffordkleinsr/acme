import { message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { smsVerificationSchema } from './schema';
import { fail } from '@sveltejs/kit';
import { createVerificationCheck } from '$lib/server/twilioconfigs/sms-messages';
import { db } from '$lib/server/db';
import { agentData, smsVerification, UsersTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { lucia } from '$lib/server/auth';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	// await db.delete(smsVerification).where(eq(smsVerification.userId, '19l18c1asy48cbo'))
	// await db.delete(agentData).where(eq(agentData.agentid, '19l18c1asy48cbo'))
	// await db.delete(UsersTable).where(eq(UsersTable.id, '19l18c1asy48cbo'))
	// check if user
	if (!user) {
		redirect(302, '/agent/signin');
	}
	const [query] = await db
		.select({
			phone: smsVerification.phone,
			status: smsVerification.verified
		})
		.from(smsVerification)
		.where(eq(smsVerification.userId, user?.id as string));

	const { phone, status } = query;
	if (status) {
		redirect(302, '/agent/signin');
	}
	return {
		number: phone,
		form: await superValidate(zod(smsVerificationSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { user, session }, cookies }) => {
		const form = await superValidate(request, zod(smsVerificationSchema));
		// validate
		if (!form.valid) {
			return message(form, {
				alertType: 'error',
				alertText: 'Please Check your entries, the form contains invalid data'
			});
		}
		// destructure form for utils
		const { verificationCode } = form.data;
		const [query] = await db
			.select({
				phone: smsVerification.phone
			})
			.from(smsVerification)
			.where(eq(smsVerification.userId, user?.id as string));

		try {
			// check if submitted code is correct
			const res = await createVerificationCheck(verificationCode, query.phone);

			if (res === 'approved') {
				await db
					.update(smsVerification)
					.set({
						verified: true
					})
					.where(eq(smsVerification.phone, query.phone));
				// Invalidate the session
				if (!session) {
					return fail(401, { message: 'You do not have a valid sesion' });
				}
				await lucia.invalidateSession(session.id);
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});
			}
		} catch (err) {
			console.error(err);

			return message(form, {
				alertType: 'error',
				alertText: 'An Unexpected error occured'
			});
		}
		redirect(
			303,
			'/agent/signin',
			{ type: 'success', message: 'Phone Verified Successfully' },
			cookies
		);
	}
};
