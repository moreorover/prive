import { handleLoginRedirect } from "$lib/helpers";
import { createStockSchema, deleteStockSchema } from "$lib/schemas";
import { supabaseAdmin } from "$lib/server/supabase-admin";
import { error, fail, redirect } from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, handleLoginRedirect(event));
	}

	async function getStock() {
		const { data: stock, error: stockError } = await event.locals.supabase
			.from("stock")
			.select(`*,created_by(full_name),updated_by(full_name)`);

		if (stockError) {
			throw error(500, "Error fetching stock, please try again later.");
		}

		return stock;
	}
	return {
		createStockForm: superValidate(createStockSchema, {
			id: "create"
		}),
		stock: getStock(),
		deleteStockForm: superValidate(deleteStockSchema, {
			id: "delete"
		})
	};
};

export const actions: Actions = {
	createStock: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const createStockForm = await superValidate(event, createStockSchema, {
			id: "create"
		});

		if (!createStockForm.valid) {
			return fail(400, {
				createStockForm: createStockForm
			});
		}

		const { error: createStockError } = await supabaseAdmin.from("stock").insert({
			...createStockForm.data,
			created_by: session.user.id
		});

		if (createStockError) {
			console.log(createStockError);
			return setError(createStockForm, null, "Error creating stock.");
		}

		return {
			createStockForm: createStockForm
		};
	},
	deleteStock: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const deleteStockForm = await superValidate(event.url, deleteStockSchema, {
			id: "delete"
		});

		if (!deleteStockForm.valid) {
			return fail(400, {
				deleteStockForm
			});
		}

		const { error: deleteStockError } = await event.locals.supabase
			.from("stock")
			.delete()
			.eq("id", deleteStockForm.data.id);

		if (deleteStockError) {
			return setError(deleteStockForm, null, "Error deleting stock");
		}

		return {
			deleteStockForm
		};
	}
};
