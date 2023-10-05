import { z } from "zod";

const UserRoles = z.enum(["admin", "moderator", "user"]);
export const rolesSchema = z.object({
	roles: z.array(UserRoles)
});
export type RolesSchema = z.infer<typeof rolesSchema>;

const RolePermissions = z.enum([
	"contacts.create",
	"contacts.update",
	"contacts.delete",
	"profiles.view",
	"profiles.update",
	"user_roles.view",
	"user_roles.update",
	"role_permissions.view",
	"role_permissions.update"
]);

export const rolePermissionsSchema = z.object({
	role: UserRoles,
	rolePermissions: z
		.object({
			permissions: RolePermissions,
			status: z.boolean()
		})
		.array()
});

export type RolePermisssionsSchema = z.infer<typeof rolePermissionsSchema>;

export const registerUserSchema = z.object({
	full_name: z.string().max(140).nullish(),
	email: z.string().email("Invalid email address"),
	instagram: z.string().max(100).nullish(),
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

export const createContactSchema = z
	.object({
		name: z.string().max(140, "Name must be 140 characters or less").nullish(),
		email: z.string().email("Invalid email address").nullish(),
		company: z.string().max(140, "Company must be 140 characters or less").nullish(),
		phone: z.string().max(64, "Phone must be 64 characters or less").nullish()
	})
	.refine(({ name, email, company, phone }) => {
		return name || email || company || phone;
	}, "At least one field must be filled out");

export type CreateContactSchema = typeof createContactSchema;

export const deleteContactSchema = z.object({
	id: z.string()
});

export type DeleteContactSchema = typeof deleteContactSchema;

export const createStockSchema = z.object({
	purchased_at: z.string().nullish(),
	length_cm: z.number().positive().default(0),
	colour: z.string().max(64, "Colour must be 64 characeters or less").nullish(),
	description: z.string().max(256, "Description must be 256 characters or less").nullish(),
	weight_expected_grams: z.number().positive().default(0),
	weight_received_grams: z.number().positive().default(0),
	code: z.string().max(28, "Code must be 28 characters of less").nullish()
});

export type CreateStockSchema = typeof createStockSchema;

export const deleteStockSchema = z.object({
	id: z.string()
});

export type DeleteStockSchema = typeof deleteContactSchema;

export const stripeProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	active: z.boolean(),
	description: z.string(),
	metadata: z.record(z.string())
});

export const stripeCustomerSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	metadata: z.record(z.string())
});

export const stripeSubscriptionStatusEnum = z.enum([
	"trialing",
	"active",
	"canceled",
	"incomplete",
	"incomplete_expired",
	"past_due",
	"unpaid",
	"paused"
]);

const stripeSubscriptionItemsSchema = z.object({
	data: z.array(
		z.object({
			price: z.object({
				product: z.string()
			})
		})
	)
});

const unixTimestampToISOString = z.number().transform((n) => new Date(n * 1000).toISOString());

export const stripeSubscriptionSchema = z
	.object({
		id: z.string(),
		status: stripeSubscriptionStatusEnum,
		customer: z.string(),
		items: stripeSubscriptionItemsSchema,
		cancel_at_period_end: z.boolean(),
		created: unixTimestampToISOString,
		current_period_start: unixTimestampToISOString,
		current_period_end: unixTimestampToISOString,
		trial_start: unixTimestampToISOString.nullable(),
		trial_end: unixTimestampToISOString.nullable(),
		metadata: z.record(z.string())
	})
	.transform((obj) => {
		const { items, customer, ...rest } = obj;
		const [{ price }] = items.data;
		return {
			...rest,
			customer_id: customer,
			product_id: price.product
		};
	});
