import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(1, 'Please enter a password')
});

export type LoginSchema = typeof loginSchema;

export const registerSchema = z.object({
	full_name: z.string().max(140).nullish(),
	email: z.string().email('Invalid email address'),
	instagram: z.string().max(100).nullish(),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password must be 100 characters of less'),
	passwordConfirm: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password must be 100 characters of less')
});

export type RegisterSchema = typeof registerSchema;
