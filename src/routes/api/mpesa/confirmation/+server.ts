import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	let data = await request.json();
	return new Response(JSON.stringify(data), { status: 200 });
};
