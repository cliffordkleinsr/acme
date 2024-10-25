import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { urlveriSchema } from './schema';
import type { C2BURLs } from '$lib/types';
import { registerURLs } from '$lib/server/mpesa';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(urlveriSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(urlveriSchema));
		// validate
		if (!form.valid) {
			return message(form, {
				alertType: 'error',
				alertText: 'Please Check your entries, the form contains invalid data'
			});
		}

		const uris = form.data as C2BURLs;

		const data = await registerURLs(uris);

		// console.log(data)

		redirect(
			303,
			'/superuser/dash',
			{
				type: 'success',
				message: data?.ResponseDescription
			},
			cookies
		);
	}
};
