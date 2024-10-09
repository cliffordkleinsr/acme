import { z } from 'zod';

export const resetSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(2, { message: 'Please use a valid email' })
		.max(50, { message: 'Your email is too long' })
		.email({ message: 'Must be a valid Email Address' })
});
export type ResetSchema = typeof resetSchema;
