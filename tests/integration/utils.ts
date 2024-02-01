import { supabaseAdmin } from '$lib/server/supabase-admin';

// Function to create an admin user and return their data
export async function getAdminUser() {
	const { data: adminUser, error: adminUserError } = await supabaseAdmin
		.from('profiles')
		.select('*')
		.eq('full_name', 'Test User')
		.single();
	return adminUser;
}

// Function to create a product and return its data
export async function createProduct(created_by: string) {
	const { data: productData, error: productError } = await supabaseAdmin
		.from('products')
		.insert({ created_by, title: 'Test Product' })
		.select('*')
		.single();
	return productData;
}

// Function to create a purchase order and return its data
export async function createPurchaseOrder(created_by: string) {
	const { data: orderData, error: orderError } = await supabaseAdmin
		.from('orders')
		.insert({ created_by, order_type: 'purchase', order_status: 'pending' })
		.select('*')
		.single();
	return orderData;
}

// Function to create a sale order and return its data
export async function createSaleOrder(created_by: string) {
	const { data: orderData, error: orderError } = await supabaseAdmin
		.from('orders')
		.insert({ created_by, order_type: 'sale', order_status: 'pending' })
		.select('*')
		.single();
	return orderData;
}

// Function to create a product with an order in the order_products table
export async function createOrderProduct(
	order_id: string,
	product_id: string,
	created_by: string,
	quantity: number,
	unit_price: number
) {
	const { data: orderProductData, error: orderProductError } = await supabaseAdmin
		.from('order_products')
		.insert({
			order_id,
			product_id,
			created_by,
			quantity,
			unit_price
		})
		.select('*')
		.single();
	return orderProductData;
}

// Function to update a product with an order in the order_products table
export async function updateOrderProduct(
	order_product_id: string,
	quantity: number,
	unit_price: number
) {
	const { data: updatedProductData, error: updatedProductError } = await supabaseAdmin
		.from('order_products')
		.update({
			quantity,
			unit_price
		})
		.eq('id', order_product_id)
		.select('*')
		.single();
	return updatedProductData;
}

// Function to delete a product with an order in the order_products table
export async function deleteOrderProduct(order_product_id: string) {
	const { data: updatedProductData, error: updatedProductError } = await supabaseAdmin
		.from('order_products')
		.delete()
		.eq('id', order_product_id);

	console.log({ updatedProductData, updatedProductError });
}

// Function to delete a product in the products table
export async function deleteProduct(product_id: string) {
	const { data: updatedProductData, error: updatedProductError } = await supabaseAdmin
		.from('products')
		.delete()
		.eq('id', product_id);
}

// Function to delete a order in the orders table
export async function deleteOrder(order_id: string) {
	const { data: updatedProductData, error: updatedProductError } = await supabaseAdmin
		.from('orders')
		.delete()
		.eq('id', order_id);
}

// Function to fetch and return updated product data
export async function fetchProduct(product_id: string) {
	const { data: updatedProductData, error: updatedProductError } = await supabaseAdmin
		.from('products')
		.select('*')
		.eq('id', product_id)
		.single();
	return updatedProductData;
}

// Function to fetch and return updated order data
export async function fetchOrder(order_id: string) {
	const { data: orderData, error: orderError } = await supabaseAdmin
		.from('orders')
		.select('*')
		.eq('id', order_id)
		.single();
	return orderData;
}
