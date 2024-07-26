import { z } from "zod";
 

export const amountSchema = z.object({
  amount: z.coerce.number().multipleOf(500, {message: 'Amount must be a multiple of 500'}).gte(1, {message: 'Amount cannot be zero'})
});

export type AmountSchema = typeof amountSchema;