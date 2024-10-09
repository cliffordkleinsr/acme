import { lucia } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get the session Id from the cookies
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	// if there's no session ID, set user and sesion to null and resolve the request
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	// If there is a session ID, validate it
	const { session, user } = await lucia.validateSession(sessionId);

	// If the session is fresh (Just created due to session expiration extending), create a new session cookie
	if (session?.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	// If the session is not valid, create a blank session cookie to deleta a session cookie from the browser
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	// Store the user and session in event.locals, so they can be accessed in endpoints and pages
	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};
