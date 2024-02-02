import { productSchema } from '$lib/schema/productSchema';
import type { Session } from '@supabase/supabase-js';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	const session: Session | null = await event.locals.getSession();

	async function getProducts() {
		const { data: products, error: productsError } = await event.locals.supabase
			.from('products')
			.select('*')
			.order('created_at', { ascending: false });

		if (productsError) {
			error(500, 'Error fetching clients, please try again later.');
		}

		return products;
	}

	return {
		orders: await getProducts(),
		createProductForm: await superValidate(productSchema, {
			id: 'createProduct'
		})
	};
};

export const actions = {
	default: async (event) => {
		const session = await event.locals.getSession();

		const createProductForm = await superValidate(event, productSchema, { id: 'createProduct' });
		if (!createProductForm.valid) {
			return fail(400, {
				form: createProductForm
			});
		}
		const { error: createProductError } = await event.locals.supabase
			.from('products')
			.insert({
				...createProductForm.data,
				created_by: session.user.id
			})
			.select();
		if (createProductError) {
			console.log(createProductError);
			return setError(createProductForm, 'Error creating product.');
		}
		return { createProductForm: createProductForm };
	}
};
