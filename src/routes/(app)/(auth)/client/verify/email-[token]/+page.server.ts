import { db } from '$lib/server/db';
import { emailVerification, UsersTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { sendWelcomeEmail } from '$lib/server/emailconfigs/email-messages';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async ({params, locals:{session}, cookies}) => {
    const token = decodeURIComponent(params.token) as string;

    const [res] = await db.select().from(emailVerification).where(
        eq(emailVerification.token, token)
    )
    if (res.verified){
        redirect(302, '/client/signin')
    }

    try {
        let heading = 'Email Verification Problem';
	    let message = 'Your email could not be verified. Please contact support if you feel this is an error.';
    
        if (res.email) {
            sendWelcomeEmail(res.email)
            heading = 'Email Verified';
            message = 'Your email has been verified. You can now <a href="/client/signin">sign in</a>';
            
            await Promise.all([
                db.update(emailVerification).set({
                    verified:true
                })
                .where(eq(emailVerification.token, token)),

                db.update(UsersTable).set({
                    isEmailVerified: true
                })
                .where(eq(UsersTable.email, res.email))
            ])
        }
        // Invalidate the session
        if (!session) {
			return fail(401, {message: 'You do not have a valid sesion'});
		}
        await lucia.invalidateSession(session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		
        return { 
            heading, 
            message }
    } 
    catch (err) {
        return fail(500, {
			error: err
		});
    }
};