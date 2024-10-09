import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { settingsSchema } from './schema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/server/db';
import { UsersTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = (async ({ locals: { user } }) => {
	const [profile] = await db
		.select()
		.from(UsersTable)
		.where(eq(UsersTable.id, user!.id as string));
	return {
		form: await superValidate(zod(settingsSchema)),
		img: profile.pfp
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals: { user } }) => {
		const form = await superValidate(request, zod(settingsSchema));
		// validate
		if (!form.valid) {
			return message(form, {
				alertType: 'error',
				alertText: 'Please Check your entries, the form contains invalid data'
			});
		}
		const { profile } = form.data;
		await db
			.update(UsersTable)
			.set({
				pfp: profile
			})
			.where(eq(UsersTable.id, user?.id as string));

		return message(form, {
			alertType: 'success',
			alertText: 'Profile picture saved'
		});
	}
};
