import { fail, type Actions } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from "zod";
import type { PageServerLoad } from "./$types";

const registerUserSchema = z.object({
    full_name: z.string().max(140).nullish(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be 100 characters of less"),
    passwordConfirm: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be 100 characters of less")
})

export const load: PageServerLoad = async (event) => {
    return {
        form: superValidate(registerUserSchema)
    }
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, registerUserSchema)

        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        if (form.data.password !== form.data.passwordConfirm) {
            return setError(form, "passwordConfirm", "Passwords do not match")
        }

        const { error: authError } = await event.locals.supabase.auth.signUp({
            email: form.data.email,
            password: form.data.password,
            options: {
                data: {
                    full_name: form.data.full_name ?? ""
                }
            }
        })

        if (authError) {
            return setError(form, null, "An error occured while registering.")
        }

        return {
            form
        }
    }
}