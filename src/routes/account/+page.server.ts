import { emailSchema, passwordSchema, profileSchema } from "$lib/schemas";
import { error, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, "/");
	}

	async function getUserProfile() {
		const { error: profileError, data: profile } = await event.locals.supabase
			.from("profiles")
			.select("*")
			.limit(1)
			.single();

		if (profileError) {
			throw error(500, "Error retrieving your profile, please try again later.");
		}

		return profile;
	}

	return {
		profileForm: superValidate(await getUserProfile(), profileSchema, {
			id: "profile"
		}),
		emailForm: superValidate({ email: session.user.email }, emailSchema, { id: "email" }),
		passwordForm: superValidate(passwordSchema, { id: "password" })
	};
};
