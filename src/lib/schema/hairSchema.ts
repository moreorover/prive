import { z } from 'zod';
export const hairSchema = z.object({
	title: z.string().min(2).max(50),
	description: z.optional(z.string().min(2).max(50)),
	weight: z.coerce.number().nonnegative(),
	length: z.coerce.number().nonnegative(),
	price: z.number().nonnegative().default(0),
	deleted: z.boolean().default(false)
});
export type HairSchema = typeof hairSchema;

export const hairUpdateSchema = z.object({
	hairId: z.number().positive(),
	title: z.string().min(2).max(50),
	description: z.optional(z.string().min(2).max(50)),
	weight: z.coerce.number().nonnegative(),
	length: z.coerce.number().nonnegative()
});
export type HairUpdateSchema = typeof hairUpdateSchema;
