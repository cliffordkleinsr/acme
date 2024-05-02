// import { type Actions, type Cookies } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';
// import { emailVerificationSchema } from './schema';
// import { zod } from 'sveltekit-superforms/adapters';
// import { fail, message, superValidate } from 'sveltekit-superforms';
// import { PENDING_VERIFICATION_COOKIE, generateEmailVerificationCode, sendEmailVerificationCode, verifyEmailVerificationCode, type pendingVerificationType } from '$lib/server/email';
// import { db } from '$lib/server/db';
// import { UsersTable } from '$lib/server/schema';
// import { eq } from 'drizzle-orm';
// import { lucia } from '$lib/server/auth';
// import { redirect } from 'sveltekit-flash-message/server';


// const getUserDataFromCookie = (cookies: Cookies) => {
// 	const cookieData = cookies.get(PENDING_VERIFICATION_COOKIE);

// 	if (!cookieData) return null;

// 	return JSON.parse(cookieData) as pendingVerificationType
// };

// export const load: PageServerLoad = async ({cookies}) => {

//     const userData = getUserDataFromCookie(cookies)

//     if (!userData) {
//         return redirect(303, '/')
//     }
//     return {
// 		pendingUserEmail: userData.email,
// 		form: await superValidate(zod(emailVerificationSchema))
// 	}
// }

// export const actions: Actions = {
//     verifyCode: async ({request, cookies}) => {
//         const userData = getUserDataFromCookie(cookies)
//         // redirect
//         if (!userData) return redirect(303, '/')

//         const form = await superValidate(request, zod(emailVerificationSchema))

//          // validate
//         if (!form.valid) {
//             return message(form, {
//                 alertType:'error',
//                 alertText:'Please Check your entries, the form contains invalid data'
//             })
//         }
//         // Check whether the verification code matches the one in the database
//         const isVerificationCodeValid = await verifyEmailVerificationCode(
// 			userData.id,
// 			form.data.verificationCode
// 		)
//         // if not show error message
//         if (isVerificationCodeValid.success === false) {
// 			return message(form, {
// 				alertType: 'error',
// 				alertText: isVerificationCodeValid.message
// 			})
// 		}
//         // if valid clear that cookie
//         cookies.set(PENDING_VERIFICATION_COOKIE, '', {
// 			maxAge: 0,
// 			path: 'email-verification'
// 		})

//         // Update database to show that the user is verified
//         await db
// 			.update(UsersTable)
// 			.set({ isEmailVerified: true })
// 			.where(eq(UsersTable.email, userData.email))
            
//         //  create a session in the database
//         const session = await lucia.createSession(userData.id, {})
//         const sessionCookie = lucia.createSessionCookie(session.id)

//         cookies.set(sessionCookie.name, sessionCookie.value,{
//             path: ".",
//             ...sessionCookie.attributes
//         })

//         if (userData.role === "CLIENT") {
//             redirect(302, '/client-dash', {type: "success", message:"Logged In Successfully"}, cookies)
//         }
//         if (userData.role === "RESP") {
//             redirect(302, '/respondent-dash', {type: "success", message:"Logged In Successfully"}, cookies)
//         }
//     },

//     sendNewCode: async ({cookies}) => {
//         const userData = getUserDataFromCookie(cookies)
//         // redirect
//         if (!userData) return redirect(303, '/')
        
//         const emailVerificationCode = await generateEmailVerificationCode(userData.id, userData.email)

//         const sendEmailVerificationCodeResult = await sendEmailVerificationCode(userData.email, emailVerificationCode)
        
//         if (!sendEmailVerificationCodeResult.success) {
//             return fail(500, {
//                 message: sendEmailVerificationCodeResult.message
//             })
//         }

//         return {
//             message: 'A new verification code has been sent to your email'
//         }
//     }
// }