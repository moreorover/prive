import { registerUserSchema } from "$lib/schemas";
import { fail, type Actions } from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms/server";

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, registerUserSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (form.data.password !== form.data.passwordConfirm) {
			return setError(form, "passwordConfirm", "Passwords do not match");
		}

		const { error: authError } = await event.locals.supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					full_name: form.data.full_name ?? ""
				}
			}
		});

		console.log({ authError });

		if (authError) {
			return setError(form, null, "An error occured while registering.");
		}

		return {
			form
		};
	}
};
