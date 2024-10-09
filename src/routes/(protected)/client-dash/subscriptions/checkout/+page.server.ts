import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const clientSecret = cookies.get('client_secret');

	if (clientSecret) {
		return {
			clientSecret: clientSecret
		};
	}
};
