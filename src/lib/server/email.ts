import { Resend } from "resend"
import { RESEND_API_KEY } from '$env/static/private'
import { alphabet, generateRandomString } from "oslo/crypto"
import { db } from "./db"
import { emailVerificationCodes } from "./schema"
import { eq } from "drizzle-orm"
import { createDate, isWithinExpirationDate } from "oslo"
import { TimeSpan } from "lucia"


const resend = new Resend(RESEND_API_KEY)

export const  PENDING_VERIFICATION_COOKIE = 'pendingVerification'

export async function generateEmailVerificationCode(userId:string, email:string) {
    const code = generateRandomString(8, alphabet('0-9'))
    // This transaction block ensures atomicity and data integrity.
    // If an error occurs while inserting the new code, the transaction will be rolled back, preventing the deletion of old verification codes.
    // This maintains the state of the database.

    await db.transaction(async (trx) => {
        // Delete any existing verification codes for the user
        await trx
            .delete(emailVerificationCodes)
            .where(eq(emailVerificationCodes.userId, userId))
        // Inser the new Verification code
        await trx.insert(emailVerificationCodes).values({
            userId: userId,
            email,
            code,
            expiresAt: createDate(new TimeSpan(5, 'm')) //5 minutes
        })
    })

    return code
}

export async function sendEmailVerificationCode(email:string, code:string) {
    const { error } = await resend.emails.send({
        from: 'CanCoon <onboarding@resend.dev>',
        to: [email],
        subject: 'Email Verification Code',
        html: `<p>Your email verification code is: <strong>${code}</strong></p>`
    })

    if (error) {
         console.error({ error })
         return { success: false, message:'Failed to send email Verification code'}
    }

    return { success: true, message:'Email Verification code sent successfully'}
}

export async function verifyEmailVerificationCode(userId:string, code:string) {
    const [verificationCode] = await db
    .select()
    .from(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, userId))

    // If there's no verification code for the user in the database
    if (!verificationCode) 
    {
        return { success: false, message:'Verification Code not found'}
    }
    // If the provided code doesnt match the one in the database
    if (verificationCode.code !== code) {
        return { success: false, message:'The provided Verification Code is Incorrect'}
    }
    // If the verification code has expired
    if (!isWithinExpirationDate(verificationCode.expiresAt)) {
        return { success: false, message:'The Verification Code has expired, please generate a new one'}
    }

    //If everything is ok, delete the verification code from the database
    await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, userId))

    // return a success message
    return { success: true, message:'Email Verification Successfull'}
}

export type pendingVerificationType =  {
    id: string,
    email:string,
    role:string,
}