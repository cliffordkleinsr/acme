import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { passwordReset, smsVerification, UsersTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { redirect } from '@sveltejs/kit';
import { updateSchema } from './schema';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(updateSchema)),
    }
};

export const actions: Actions = {
    default : async ({request, params:{token}}) => {
        const form = await superValidate(request, zod(updateSchema))
        // validate
        if (!form.valid) {
            return message(form, {
                alertType:'error',
                alertText:'Please Check your entries, the form contains invalid data'
            })
        }

        // destructure
        const { password} = form.data
        //find this idiot
        const tk = token as string

        const [user] = await db.select({
            email: passwordReset.email
        })
        .from(passwordReset)
        .where(eq(passwordReset.token, tk))
        

        try {
            
            // cant use old password :)
            const [existingUser] = await db
                .select()
                .from(UsersTable)
                .where(eq(UsersTable.email, user.email))
            const validPassword = await new Argon2id().verify(
                existingUser.password,
                password
            )
            if (validPassword) {
                return setError(form, 'password', 'New password cannot be your old password')
            }

            // update their passwords
            const hashPassword = await new Argon2id().hash(password)
            await db.update(UsersTable).set({
                password: hashPassword
            })
            .where(eq(UsersTable.email, user.email))

            // Remove from db
            await db.delete(passwordReset).where(
                eq(passwordReset.token, tk)
            )
        } catch (err) {
            console.error(err)

            return message(form, {
                alertType: 'error',
                alertText: 'An Unexpected error occured'
            })
        }
        redirect(302, `/agent/password/update-${tk}/success`)

    }
};