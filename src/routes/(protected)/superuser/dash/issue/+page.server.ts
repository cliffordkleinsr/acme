import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { ticketSchema } from '$lib/common/schema';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(ticketSchema))
	};
};

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
