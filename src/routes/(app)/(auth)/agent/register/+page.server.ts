
import { message, setError, superValidate } from "sveltekit-superforms"
import { registerRSchema } from './schema'
import { zod } from "sveltekit-superforms/adapters"
import { redirect } from 'sveltekit-flash-message/server'
import { checkIfEmailExists, insertNewUser, insertRespData } from "$lib/server/db_utils"
import { generateId } from "lucia"
import { Argon2id } from "oslo/password"
import { lucia } from "$lib/server/auth";
import { calculateAge, handleLoginRedirect } from "$lib/helperFunctions/helpers"
import type { Actions, PageServerLoad } from "./$types"


export const load: PageServerLoad = async ({locals: { user}, url}) => {
    if (user) 
    {
        if (user.role === "AGENT") {
            // redirect('/respondent-dash',  {type: "error", message:"User Already Logged In"}, cookies)
            redirect(302, handleLoginRedirect('/agent-dash', url, "User Already Logged In"))

        }
    }
    return {
        form: await superValidate(zod(registerRSchema)),
      }
}

export const actions: Actions = {
    default: async({ request, cookies, url}) =>{
        const form = await superValidate(request, zod(registerRSchema))
        // validate
        if (!form.valid) {
            return message(form, {
                alertType:'error',
                alertText:'Please Check your entries, the form contains invalid data'
            })
        }
        // destructure form.data for some operations and insertions
        const { 
            fullname,
            email,
            password,
            county,
            income,
            employment,
            education,
            sector,
            phoneno,
            dateofbirth,
            gender,
        } = form.data

        // check if the email is already registered
        const exists = await checkIfEmailExists(email)

        if (exists) {
            return setError(form, 'email', 'Email already registered')
        }

        try 
        {
            const userid = generateId(15)
            const hashPassword =  await new Argon2id().hash(password)
            let age = calculateAge(dateofbirth)
            await insertNewUser({
                id: userid,
                fullname: fullname,
                email: email,
                password:hashPassword,
                role: "AGENT",
                isEmailVerified: true, //set to false if you use email verification
                age: age,
                gender: gender
            })

            await insertRespData({
                email: email,
                agentid: userid,
                phone: phoneno,
                dateofbirth:dateofbirth,
                county: county,
                income: income,
                employment: employment,
                education: education,
                sector: sector
            })

            // create a session in the database
            const session = await lucia.createSession(userid, {})
            const sessionCookie = lucia.createSessionCookie(session.id)

            cookies.set(sessionCookie.name, sessionCookie.value,{
                path: ".",
                ...sessionCookie.attributes
            })
           

        } catch (err) 
        {
            console.error(err)

            return message(form, {
                alertType: 'error',
                alertText: 'An Unexpected error occured'
            })
        }
        const redirectTo = url.searchParams.get('redirectTo')
         if (redirectTo) {
            redirect(302, `/${redirectTo.slice(1)}`, {type: "success", message:"Logged In Successfully"}, cookies)
         }
        throw redirect(303, '/agent/signin', {type: "success", message:"User Registration Successful"}, cookies)
    }
};