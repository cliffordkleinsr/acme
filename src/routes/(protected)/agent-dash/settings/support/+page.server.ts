import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ticketSchema } from '$lib/common/schema';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return { form: await superValidate(zod(ticketSchema)) };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(ticketSchema));
		// validate
		if (!form.valid) {
			return message(form, {
				alertType: 'error',
				alertText: 'Please Check your entries, the form contains invalid data'
			});
		}
	}
};
