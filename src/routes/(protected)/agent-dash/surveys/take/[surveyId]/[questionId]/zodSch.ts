import { z } from "zod";

const questionZodSchema = z.object({
    answer: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'})
})
const rateZodSchema = z.object({
    answer: z
        .string({ required_error: 'Option is required' })
        .min(1, { message: 'Option is required' })
})
const rankansZodSchema = z.object({
    id: z
        .string({ required_error: 'id is required' })
        .min(1, { message: 'id is required' }),
    option: z
        .string({ required_error: 'Option is required' })
        .min(2, { message: 'Option must have atleast 2 characters' })
        .max(500, { message: 'Option must have a maximum 500 characters'}),
})
const optionalansZodSchema = z.object({
    answer: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'}),
    id: z
        .string({ required_error: 'Answer is required' })
        .min(2, { message: 'Answer must have atleast 2 characters' })
        .max(500, { message: 'Answer must have a maximum 500 characters'})
})

export { questionZodSchema, rateZodSchema, rankansZodSchema, optionalansZodSchema }