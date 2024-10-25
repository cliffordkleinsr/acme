import { getAccessToken } from '$lib/server/mpesa';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const access_tocken = await getAccessToken();
	return new Response(JSON.stringify(access_tocken));
};
