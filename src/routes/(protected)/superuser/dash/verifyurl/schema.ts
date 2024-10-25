import { z } from 'zod';

export const urlveriSchema = z.object({
	validationURL: z
		.string({
			required_error: 'validationURL is required'
		})
		.url({ message: 'Invalid url' }),

	confirmationURL: z
		.string({
			required_error: 'confirmationURL is required'
		})
		.url({ message: 'Invalid url' })
});

export type UrlVeriSchema = typeof urlveriSchema;
