import { z } from "zod"

export const signinASchema = z.object({
    username: z
        .string({ required_error: 'UserName is required' })
        .min(2, { message: 'UserName must have atleast 2 characters' }
        ).max(50, { message: 'UserName must have a maximum 50 characters' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(2, { message: 'Password must have atleast 2 characters' })
        .max(50, { message: 'Password must have atleast 50 characters' })
        .trim()
    })

export type SigninASchema = typeof signinASchema