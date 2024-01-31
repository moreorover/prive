import { supabaseAdmin } from '$lib/server/supabase-admin';
import { beforeAll, expect, test } from 'vitest';

let adminUser;
let product;
let purchaseOrder;
let saleOrder;
let purchaseOrderProduct;
let saleOrderProduct;

beforeAll(async () => {
	adminUser = await getAdminUser();
	product = await createProduct(adminUser?.id);
	purchaseOrder = await createPurchaseOrder(adminUser?.id);
	saleOrder = await createSaleOrder(adminUser?.id);

	// clean up function, called once after all tests run
	return async () => {};
});

// Function to create an admin user and return their data
async function getAdminUser() {
	const { data: adminUser, error: adminUserError } = await supabaseAdmin
		.from('profiles')
		.select('*')
		.eq('full_name', 'Test User')
		.single();
	return adminUser;
}

// Function to create a product and return its data
async function createProduct(created_by: string) {
	const { data: productData, error: productError } = await supabaseAdmin
		.from('products')
		.insert({ created_by, title: 'Test Product' })
		.select('*')
		.single();
	return productData;
}

// Function to create a purchase order and return its data
async function createPurchaseOrder(created_by) {
	const { data: orderData, error: orderError } = await supabaseAdmin
		.from('orders')
		.insert({ created_by, order_type: 'purchase', order_status: 'pending' })
		.select('*')
		.single();
	return orderData;
}

// Function to create a sale order and return its data
async function createSaleOrder(created_by) {
	const { data: orderData, error: orderError } = await supabaseAdmin
		.from('orders')
		.insert({ created_by, order_type: 'sale', order_status: 'pending' })
		.select('*')
		.single();
	return orderData;
}

// Function to create a product with an order in the order_products table
async function createOrderProduct(
	order_id: string,
	product_id: string,
	created_by: string,
	quantity: number
) {
	const { data: orderProductData, error: orderProductError } = await supabaseAdmin
		.from('order_products')
		.insert({
			order_id,
			product_id,
			created_by,
			quantity
		})
		.select('*')
		.single();
	return orderProductData;
}

// Function to update a product with an order in the order_products table
async function updateOrderProduct(order_product_id: string, quantity: number) {
	const { data: updatedProductData, error: updatedProductError } = await supabaseAdmin
		.from('order_products')
		.update({
			quantity
		})
		.eq('id', order_product_id)
		.select('*')
		.single();

	console.log({ updateOrderProduct, updatedProductError });
	return updatedProductData;
}

// Function to fetch and return updated product data
async function fetchProduct(product_id: string) {
	const { data: updatedProductData, error: updatedProductError } = await supabaseAdmin
		.from('products')
		.select('*')
		.eq('id', product_id)
		.single();
	return updatedProductData;
}

test('test purchase orders and their products', async () => {
	expect(adminUser?.id, 'admin user id null').not.toBe(null);
	expect(product?.id, 'product id null').not.toBe(null);
	expect(purchaseOrder?.id, 'order id null').not.toBe(null);

	// Associate the product with the order
	purchaseOrderProduct = await createOrderProduct(
		purchaseOrder?.id,
		product?.id,
		adminUser?.id,
		10
	);
	expect(purchaseOrderProduct?.id, 'order product id null').not.toBe(null);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 10
	expect(product?.units_in_stock, 'Product units in stock').toBe(10);

	purchaseOrderProduct = await updateOrderProduct(purchaseOrderProduct?.id, 8);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 8
	expect(product?.units_in_stock, 'Product units in stock').toBe(8);

	purchaseOrderProduct = await updateOrderProduct(purchaseOrderProduct?.id, 12);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 8
	expect(product?.units_in_stock, 'Product units in stock').toBe(12);

	// Associate the product with the order
	saleOrderProduct = await createOrderProduct(saleOrder?.id, product?.id, adminUser?.id, 5);
	expect(purchaseOrderProduct?.id, 'order product id null').not.toBe(null);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 7
	expect(product?.units_in_stock, 'Product units in stock').toBe(7);

	saleOrderProduct = await updateOrderProduct(saleOrderProduct?.id, 6);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 7
	expect(product?.units_in_stock, 'Product units in stock').toBe(8);
});
