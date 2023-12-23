import { z } from 'zod';
export const clientSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.optional(z.string().email().nullable()),
	phone: z.optional(
		z
			.string()
			.min(8)
			.max(20)
			.transform((val) => {
				if (val.trim().length === 0) {
					return null;
				}
			})
			.nullable()
	),
	instagram: z.optional(
		z
			.string()
			.min(2)
			.max(25)
			.transform((val) => {
				if (val.trim().length === 0) {
					return null;
				}
			})
			.nullable()
	)
});
export type ClientSchema = typeof clientSchema;
