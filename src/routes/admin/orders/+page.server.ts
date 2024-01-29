import { orderSchema } from '$lib/schema/orderSchema';
import type { Session } from '@supabase/supabase-js';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	const session: Session | null = await event.locals.getSession();

	async function getOrders() {
		const { data: orders, error: ordersError } = await event.locals.supabase
			.from('orders')
			.select('*, clients(id, name)')
			.order('created_at', { ascending: false });

		if (ordersError) {
			error(500, 'Error fetching clients, please try again later.');
		}

		return orders;
	}

	return {
		orders: await getOrders(),
		createOrderForm: await superValidate(orderSchema, {
			id: 'createOrder'
		})
	};
};

export const actions = {
	default: async (event) => {
		const session = await event.locals.getSession();

		const createOrderForm = await superValidate(event, orderSchema, { id: 'createOrder' });
		if (!createOrderForm.valid) {
			return fail(400, {
				form: createOrderForm
			});
		}
		const { error: createOrderError } = await event.locals.supabase
			.from('orders')
			.insert({
				...createOrderForm.data,
				created_by: session.user.id
			})
			.select();
		if (createOrderError) {
			console.log(createOrderError);
			return setError(createOrderForm, 'Error creating order.');
		}
		return { createOrderForm };
	}
};
