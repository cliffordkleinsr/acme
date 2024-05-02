import { z } from "zod";

export const emailVerificationSchema = z.object({
    verificationCode : z.string().length(8)
})

export type EmailVerificationSchema = typeof emailVerificationSchema