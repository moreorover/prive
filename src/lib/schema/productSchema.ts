import { z } from 'zod';
export const productSchema = z.object({
	title: z.string().min(2).max(100),
	description: z.string().min(1, 'Please enter a valid description').optional().or(z.literal('')),
	upc: z.string().min(4, 'Please enter a valid value').optional().or(z.literal(null)),
	rrp: z.optional(z.coerce.number().nonnegative()).default(0),
	supplier_id: z.string().min(4, 'Please enter a valid supplier').optional().or(z.literal(null))
});
export type ProductSchema = typeof productSchema;

export const productAddToOrderSchema = z.object({
	productId: z.string(),
	quantity: z.coerce.number().nonnegative(),
	unit_price: z.coerce.number().nonnegative()
});

export type ProductAddToOrderSchema = typeof productAddToOrderSchema;
