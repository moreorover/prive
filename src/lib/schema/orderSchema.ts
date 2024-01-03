import { z } from 'zod';
export const orderSchema = z.object({
	title: z.string().min(2).max(50)
});
export type OrderSchema = typeof orderSchema;

export type Client = {
	id: string | null;
	name: string;
};

export const selectClientSchema = z.object({
	id: z.optional(z.string().nullable()).nullable()
});
export type SelectClientSchema = typeof selectClientSchema;

export const setOrderStatusSchema = z.object({
	completed: z.boolean().default(false)
});
export type SetOrderStatusSchema = typeof setOrderStatusSchema;
