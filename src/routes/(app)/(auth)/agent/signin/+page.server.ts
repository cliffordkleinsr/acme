import { signinRSchema } from "./schema"
import { zod } from "sveltekit-superforms/adapters"
import { message, setError, superValidate } from "sveltekit-superforms";
import { fail } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { agentData, clientData, emailVerification, sessionsTable, smsVerification, UsersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth";
import { redirect } from "sveltekit-flash-message/server";
import { handleLoginRedirect } from "$lib/helperFunctions/helpers";
import type { Actions, PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({locals: { user}, url}) => {
    // await db.delete(smsVerification).where(eq(smsVerification.userId, 't73teafewm08kvz'))
    // await db.delete(agentData).where(eq(agentData.agentid, 't73teafewm08kvz'))
    // await db.delete(UsersTable).where(eq(UsersTable.id, 't73teafewm08kvz'))
    if (user) 
    {
        if (user.role === "AGENT") {
            // redirect('/respondent-dash',  {type: "error", message:"User Already Logged In"}, cookies)
            redirect(302, handleLoginRedirect('/agent-dash', url, "User Already Logged In"))
        }
    }

    return {
        form: await superValidate(zod(signinRSchema)),
      }
}
export const actions: Actions = {
    login: async({request, cookies, url}) =>{
        let validate = false
        const form = await superValidate(request, zod(signinRSchema))
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
            password: UsersTable.password,
            role: UsersTable.role
        })
        .from(UsersTable)
        .where(eq(UsersTable.email, email))

        // If does not exist
        if (existingUser === undefined) {
            return setError(form, 'email', 'Email not registered')
        }

        if (existingUser.role === "CLIENT") {
            return setError(form, 'email', 'User of this type is not allowed, please use the appropriate login form')
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

        const [state] = await db
        .select({
            Ver: smsVerification.verified
        })
        .from(smsVerification)
        .where(eq(smsVerification.userId, existingUser.id))
        if (validate){
            if (state.Ver) {
                redirect(302, '/agent-dash', {type: "success", message:"Logged In Successfully"}, cookies)
            }
            else {
                redirect(302, '/agent/verify', {type: "warning", message:"Phone Number is Not Verified!"}, cookies)
            }
        }
        else {
            redirect(302, '/agent-dash', {type: "success", message:"Logged In Successfully"}, cookies)
        }
    }
}