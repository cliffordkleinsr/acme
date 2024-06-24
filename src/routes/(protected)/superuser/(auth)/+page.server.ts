import { message, setError, superValidate } from "sveltekit-superforms"
import { signinASchema } from "./schema"
import { zod } from "sveltekit-superforms/adapters"
import type { Actions, PageServerLoad } from "./$types"
import { UsersTable } from "$lib/server/schema"
import { db } from "$lib/server/db"
import { eq } from "drizzle-orm"
import { lucia } from "$lib/server/auth"
import { redirect } from "sveltekit-flash-message/server"
import { handleLoginRedirect } from "$lib/helperFunctions/helpers"
import { generateId } from "lucia"
import { Argon2id } from "oslo/password"
import { insertNewUser } from "$lib/server/db_utils"

export const load: PageServerLoad = async ({locals: { user}, url}) => {
    if (user) {
        if (user.role === "ADMIN") {
            // redirect('/client-dash',  {type: "error", message:"User Already Logged In"}, cookies)
            redirect(302, handleLoginRedirect('/superuser/dash', url, "User Already Logged In"))
        }
    }
    return {
        form: await superValidate(zod(signinASchema)),
      }
}

export const actions: Actions = {
    default: async({ request, cookies, url}) =>{
        const form = await superValidate(request, zod(signinASchema))
        // validate
        if (!form.valid) {
            return message(form, {
                alertType:'error',
                alertText:'Please Check your entries, the form contains invalid data'
            })
        }
        // destructure form.data for validation
        const {username ,password} = form.data
        // ta create
        // const userid = generateId(15)
        // const hashPassword =  await new Argon2id().hash(password)
        // await insertNewUser({
        //     id: userid,
        //     fullname: username,
        //     email: "admin@int-insights.com",
        //     password:hashPassword,
        //     isEmailVerified: true, //set to false if you use email verification
        //     role:'ADMIN'
        // })


        // If form Is valid check if exists
        const [existingUser] = await db
        .select({
            id: UsersTable.id,
            password: UsersTable.password
        })
        .from(UsersTable)
        .where(eq(UsersTable.fullname, username))

        // If does not exist
        if (existingUser === undefined) {
            return setError(form, 'username', 'Super user does not exist')
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
         redirect(302, '/superuser/dash', {type: "success", message:"Logged In Successfully"}, cookies)
    }
};