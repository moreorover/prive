import { supabaseAdmin } from '$lib/server/supabase-admin';
import { expect, test } from 'vitest';

test('test purchase orders and their products', async () => {
	const { data: adminUser, error: adminUserError } = await supabaseAdmin
		.from('profiles')
		.select('*')
		.eq('full_name', 'Test User')
		.single();

	expect(adminUser?.id, 'admin user id null').not.toBe(null);

	const { data: productData, error: productError } = await supabaseAdmin
		.from('products')
		.insert({ created_by: adminUser?.id, title: 'Test Product' })
		.select('*')
		.single();

	expect(productData?.id, 'product id null').not.toBe(null);

	const { data: orderData, error: orderError } = await supabaseAdmin
		.from('orders')
		.insert({ created_by: adminUser?.id, order_type: 'purchase', order_status: 'pending' })
		.select('*')
		.single();

	expect(orderData?.id, 'product id null').not.toBe(null);

	const { data: orderProductData, error: orderProductError } = await supabaseAdmin
		.from('order_products')
		.insert({
			order_id: orderData?.id,
			product_id: productData?.id,
			quantity: 10,
			created_by: adminUser?.id
		})
		.select();

	expect(orderProductData?.id, 'order product id null').not.toBe(null);

	const { data: updatedProductData, error: updatedProductError } = await supabaseAdmin
		.from('products')
		.select('*')
		.eq('id', productData?.id)
		.single();

	expect(updatedProductData?.units_in_stock, 'Product units in stock').toBe(10);
});
