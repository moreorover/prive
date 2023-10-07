import { redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";
import type { PageServerLoad, PageServerLoadEvent } from "./$types";

const loginUserSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Please enter a password")
});

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const session = await event.locals.getSession();
	if (session) {
		throw redirect(302, "/");
	}
	return {
		form: superValidate(loginUserSchema)
	};
};
