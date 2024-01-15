import { z } from 'zod';
export const hairSchema = z.object({
	title: z.string().min(2).max(50),
	description: z.optional(z.string().min(2).max(50)),
	weight: z.coerce.number().nonnegative().default(0),
	length: z.coerce.number().positive(),
	price: z.number().nonnegative().default(0),
	deleted: z.boolean().default(false)
});
export type HairSchema = typeof hairSchema;
