import { z } from "zod"
import cty from '$lib/json/counties.json'



export const counties = cty
type Counties = (typeof counties)[number]["name"];
export const registerRSchema = z.object({
    fullname: z
        .string({ required_error: 'Name is required' })
        .min(2, { message: 'Name must be more than 2 characters' })
        .max(50, { message: 'Name must cant have a maximum of 50 characters' })
        .trim(),
    email: z
        .string({ required_error: 'Email is required' })
        .min(2, { message: 'Email must have atleast 2 characters' }
        ).max(50, { message: 'Email cant have a maximum 50 characters' })
        .email({ message: 'Must be a valid Email Address' }),
    phoneno: z
        .string({ required_error: 'Phone number is required' })
        .min(10, { message: 'Phone number must be more equal to ten digits' }),
    gender: z
        .string({ required_error: 'Gender is required' })
        .min(4, { message: 'Please select a valid gender' }),
    dateofbirth: z
        .string()
        .refine((v) => v, { message: "A date of birth is required." }),
    county: z
        .enum(
            counties.map((f) => f.name) as [Counties, ...Counties[]],
            {
                errorMap: () => ({ message: "Please select a valid County." })
            }
        ),
    income: z
        .string({
            required_error: "Must be valid Income Bracket.",
        })
        .includes('000', { message: "Must be a valid Income Bracket" }),
    employment: z
        .string({
            required_error: "Must be valid Employment Bracket.",
        })
        .includes('yed', { message: "Must be a valid Employment Bracket" }),
    education: z
        .string({
            required_error: "Must be valid Education Bracket.",
        })
        .includes('00', { message: "Must be a valid Education Bracket" }),
    sector: z
        .string({
            required_error: "Must be valid Sector",
        })
        .includes('00', { message: "Must be a valid Sector" }),
    password: z
        .string({ required_error: 'Password is required' })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {message : 'must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'})
        .min(2, { message: 'Password must have atleast 2 characters' })
        .max(50, { message: 'Password must have atleast 50 characters' })
        .trim(),
    passwordConfirm: z
        .string({ required_error: 'Password is required' })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {message : 'must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'})
        .min(2, { message: 'Password must have atleast 2 characters' })
        .max(50, { message: 'Password must have atleast 50 characters' })
        .trim()
})
.superRefine(({ passwordConfirm, password }, ctx) => {
    if (password !== passwordConfirm) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords and Confirm Password Must match',
            path: ['password']
        })
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords and Confirm Password Must match',
            path: ['passwordConfirm']
        })
    }
})

export type RegisterRSchema = typeof registerRSchema
