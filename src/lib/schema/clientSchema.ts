import { z } from 'zod';
export const clientSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email().optional().or(z.literal('')),
	phone: z.string().min(7).max(14).optional().or(z.literal('')),
	instagram: z.string().min(2).max(20).optional().or(z.literal('')),
	abbreviation: z.string().min(2).max(4).optional().or(z.literal(''))
});
export type ClientSchema = typeof clientSchema;
