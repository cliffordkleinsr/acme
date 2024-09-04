import { z } from "zod";


export const ticketSchema = z.object({
    client: z
        .string({ required_error: 'Name is required' })
        .min(2, { message: 'Enter a valid name' })
        .max(50, { message: 'Name name is too long' })
        .trim(),
    email: z
        .string()
        .min(2, { message: 'Email must be valid' })
        .max(50, { message: 'Email is too long' })
        .email({ message: 'Must be a valid Email Address' }),
    phoneno: z
        .string()
        .min(10, { message: 'Phone number must be more equal to ten digits' })
        .regex(/^(?:(?:\+254)|0)?([17])(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6}$/gm, {message: "Must be a valid Kenyan phone number"}),
    issue: z
        .string({ required_error: "Please select an email to display" }),
    priority: z
        .string({ required_error: "Please select an email to display" }),
    
    description: z
        .string({ required_error: 'Description is required' })
        .min(15, { message: 'Enter a valid Description' })
        .max(150, { message: 'Description exceeds the limit of 150 chars' })
        .trim(),
})

export type TicketSchema = typeof ticketSchema