import { z } from 'zod';
export const clientSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.optional(z.string().email()).transform((e) => (e === undefined ? '' : e)),
	phone: z
		.union([z.string().length(0), z.string().min(7).max(14)])
		.optional()
		.transform((e) => (e === undefined ? '' : e)),
	instagram: z
		.union([z.string().length(0), z.string().min(2).max(20)])
		.optional()
		.transform((e) => (e === undefined ? '' : e)),
	abbreviation: z
		.union([z.string().length(0), z.string().min(2).max(4)])
		.optional()
		.transform((e) => (e === undefined ? '' : e))
});
export type ClientSchema = typeof clientSchema;
