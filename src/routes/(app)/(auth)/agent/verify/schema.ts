import { z } from "zod";

export const smsVerificationSchema = z.object({
    verificationCode : z.string().length(6, {message: 'Please Input a valid OTP'})
})

export type SMSVerificationSchema = typeof smsVerificationSchema