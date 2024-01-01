import { error, fail, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { handleLoginRedirect } from '$lib/helpers';
import { orderSchema } from '$lib/schema/orderSchema';
import type { Session } from '@supabase/supabase-js';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const session: Session | null = await event.locals.getSession();
	if (!session) {
		throw redirect(302, handleLoginRedirect(event));
	}

	async function getOrder(order_id: string) {
		const { error: orderError, data: order } = await event.locals.supabase
			.from('orders')
			.select('*')
			.eq('id', order_id)
			.limit(1)
			.maybeSingle();

		if (orderError) {
			throw error(500, 'Error fetching order. Please try again later.');
		}
		if (!order) {
			throw error(404, 'Contact not found.');
		}
		return order;
	}
	return {
		order: event.params.orderId ? await getOrder(event.params.orderId) : null,
		updateOrderForm: await superValidate(
			event.params.orderId ? await getOrder(event.params.orderId) : null,
			orderSchema
		)
	};
};

export const actions: Actions = {
	updateOrder: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const updateContactForm = await superValidate(event, orderSchema);

		if (!updateContactForm.valid) {
			return fail(400, {
				updateContactForm
			});
		}

		const { error: updateContactError } = await event.locals.supabase
			.from('orders')
			.update(updateContactForm.data)
			.eq('id', event.params.orderId);

		if (updateContactError) {
			return setError(updateContactForm, 'Error updating order, please try again later.');
		}

		return {
			updateContactForm
		};
	}
};
