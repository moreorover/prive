import { createStockSchema } from "$lib/schemas";
import { error, fail, redirect } from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, "/login");
	}

	async function getStock(stock_id: string) {
		const { error: stockError, data: stock } = await event.locals.supabase
			.from("stock")
			.select("*")
			.eq("id", stock_id)
			.limit(1)
			.maybeSingle();

		if (stockError) {
			console.log(stockError);
			throw error(500, "Error fetching stock. Please try again later.");
		}
		if (!stock) {
			throw error(404, "Stock not found.");
		}
		return stock;
	}
	return {
		updateStockForm: superValidate(await getStock(event.params.stockId), createStockSchema)
	};
};

export const actions: Actions = {
	updateStock: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const updateStockForm = await superValidate(event, createStockSchema);

		if (!updateStockForm.valid) {
			return fail(400, {
				updateStockForm
			});
		}

		const { error: updateStockError } = await event.locals.supabase
			.from("stock")
			.update({ ...updateStockForm.data, updated_by: session.user.id })
			.eq("id", event.params.stockId);

		if (updateStockError) {
			return setError(updateStockForm, null, "Error updating stock, please try again later.");
		}

		return {
			updateStockForm
		};
	}
};
