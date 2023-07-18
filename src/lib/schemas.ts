import { z } from "zod";

export const registerUserSchema = z.object({
	full_name: z.string().max(140).nullish(),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(100, "Password must be 100 characters of less"),
	passwordConfirm: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(100, "Password must be 100 characters of less")
});

export const profileSchema = registerUserSchema.pick({ full_name: true });
export type ProfileSchema = typeof profileSchema;

export const emailSchema = registerUserSchema.pick({ email: true });
export type EmailSchema = typeof emailSchema;

export const passwordSchema = registerUserSchema.pick({ password: true, passwordConfirm: true });
export type PasswordSchema = typeof passwordSchema;
