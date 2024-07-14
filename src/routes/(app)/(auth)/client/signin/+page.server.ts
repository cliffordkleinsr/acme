import { message, setError, superValidate } from "sveltekit-superforms"
import { signinCSchema } from "./schema"
import { zod } from "sveltekit-superforms/adapters"
import type { Actions, PageServerLoad } from "./$types"
import { clientData, UsersTable } from "$lib/server/schema"
import { db } from "$lib/server/db"
import { eq } from "drizzle-orm"
import { Argon2id } from "oslo/password"
import { lucia } from "$lib/server/auth"
import { redirect } from "sveltekit-flash-message/server"
import { handleLoginRedirect } from "$lib/helperFunctions/helpers"


export const load: PageServerLoad = async ({locals: { user}, url}) => {
    if (user) {
        if (user.role === "CLIENT") {
            // redirect('/client-dash',  {type: "error", message:"User Already Logged In"}, cookies)
            redirect(302, handleLoginRedirect('/client-dash', url, "User Already Logged In"))
        }
    }
    return {
        form: await superValidate(zod(signinCSchema)),
      }
}

export const actions: Actions = {
    default: async({ request, cookies, url}) =>{
        const form = await superValidate(request, zod(signinCSchema))
        // await db.update(clientData)
        // .set({
        //     packageid: null,
        //     payment_status: false,
        //     processed_at: null
        // })
        // validate
        if (!form.valid) {
            return message(form, {
                alertType:'error',
                alertText:'Please Check your entries, the form contains invalid data'
            })
        }
        // destructure form.data for validation
        const {email ,password} = form.data
        // If form Is valid check if exists
        const [existingUser] = await db
        .select({
            id: UsersTable.id,
            password: UsersTable.password
        })
        .from(UsersTable)
        .where(eq(UsersTable.email, email))

        // If does not exist
        if (existingUser === undefined) {
            return setError(form, 'email', 'Email not registered')
        }

        // Verify the password
        const validPassword = await new Argon2id().verify(
            existingUser.password,
            password
        )

        if (!validPassword) {
            return setError(form, 'password', 'Incorrect Password')
        }

         // create a session in the database
         const session = await lucia.createSession(existingUser.id, {})
         const sessionCookie = lucia.createSessionCookie(session.id)

         cookies.set(sessionCookie.name, sessionCookie.value,{
             path: ".",
             ...sessionCookie.attributes
         })

         const redirectTo = url.searchParams.get('redirectTo')
         if (redirectTo) {
            redirect(302, `/${redirectTo.slice(1)}`, {type: "success", message:"Logged In Successfully"}, cookies)
         }
         redirect(302, '/client-dash', {type: "success", message:"Logged In Successfully"}, cookies)
    }
};