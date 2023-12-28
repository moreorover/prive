import { z } from 'zod';
export const clientSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.optional(z.string().email().nullable()),
	phone: z.optional(
		z
			.string()
			.min(8)
			.max(20)
			.transform((val: string): string | null => {
				if (!val || val.trim() === '') {
					return null;
				}
				return val;
			})
			.nullable()
	),
	instagram: z.optional(
		z
			.string()
			.min(2)
			.max(25)
			.transform((val: string): string | null => {
				if (!val || val.trim() === '') {
					return null;
				}
				return val;
			})
			.nullable()
	)
});
export type ClientSchema = typeof clientSchema;
