import { z } from 'zod';
export const orderSchema = z.object({
	title: z.string().min(2).max(50)
});
export type OrderSchema = typeof orderSchema;
