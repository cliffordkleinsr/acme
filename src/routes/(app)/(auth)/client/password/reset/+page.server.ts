import { message, setError, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { resetSchema } from './schema';
import { passwordReset, UsersTable } from '$lib/server/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { checkIfEmailExists } from '$lib/server/db_utils';
import { sendPasswordResetEmail } from '$lib/server/emailconfigs/email-messages';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(resetSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const form = await superValidate(request, zod(resetSchema));
		// validate
		if (!form.valid) {
			return message(form, {
				alertType: 'error',
				alertText: 'Please Check your entries, the form contains invalid data'
			});
		}
		// destructure
		const { email } = form.data;
		const token = crypto.randomUUID();

		// check if the email is already registered
		const exists = await checkIfEmailExists(email);

		if (!exists) {
			return setError(form, 'email', 'This email isnt registered');
		}
		try {
			//add user to db
			await db.insert(passwordReset).values({
				email,
				token
			});
			// send email
			await sendPasswordResetEmail(email, token, 'client');
		} catch (err) {
			console.error(err);

			return message(form, {
				alertType: 'error',
				alertText: 'An Unexpected error occured'
			});
		}

		redirect(302, '/client/password/reset/success');
	}
};
