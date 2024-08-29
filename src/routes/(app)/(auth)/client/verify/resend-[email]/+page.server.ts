import { db } from '$lib/server/db';
import { emailVerification } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { sendVerificationEmail } from '$lib/server/emailconfigs/email-messages';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async ({params, locals:{user}}) => {
    if (!user) redirect(302, '/client/signin')
      
    const email = decodeURIComponent(params.email) as string

    const [res] = await db.select().from(emailVerification).where(
        eq(emailVerification.email, email)
    )

    if (res.verified){
        redirect(302, '/client/signin')
    }
    try 
    {
        let heading = 'Email Verification Problem';
	    let message = 'A new email could not be sent. Please contact support if you feel this was an error.';
    
        if (res.email) {
            heading = 'Email Verification Sent';
            message =' A new verification email was sent. Please check your email for the message. (Check the spam folder if it is not in your inbox)'; 
        
            sendVerificationEmail(res.email, res.token, 'client')
        }
        return { 
            heading,
            message
        }
    } catch (err) {
        return fail(500, {
			error: err
		})
    }
};