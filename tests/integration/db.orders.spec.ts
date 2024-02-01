import { beforeAll, expect, test } from 'vitest';
import {
	createOrderProduct,
	createProduct,
	createPurchaseOrder,
	createSaleOrder,
	deleteOrder,
	deleteOrderProduct,
	deleteProduct,
	fetchOrder,
	fetchProduct,
	getAdminUser,
	updateOrderProduct
} from './utils';

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
	return async () => {
		await deleteOrder(saleOrder?.id);
		await deleteOrder(purchaseOrder?.id);
		await deleteProduct(product?.id);
	};
});

test('test purchase orders and their products', async () => {
	expect(adminUser?.id, 'admin user id null').not.toBe(null);
	expect(product?.id, 'product id null').not.toBe(null);
	expect(purchaseOrder?.id, 'purchase order id null').not.toBe(null);
	expect(saleOrder?.id, 'sale order id null').not.toBe(null);

	purchaseOrderProduct = await createOrderProduct(
		purchaseOrder?.id,
		product?.id,
		adminUser?.id,
		10,
		2.99
	);

	purchaseOrder = await fetchOrder(purchaseOrder?.id);

	expect(purchaseOrderProduct?.id, 'purchase order product id null').not.toBe(null);
	expect(purchaseOrder?.total, 'purchase order product total').toBe(-29.9);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 10
	expect(product?.units_in_stock, 'Product units in stock').toBe(10);

	// Update the quantity of the order product
	purchaseOrderProduct = await updateOrderProduct(purchaseOrderProduct?.id, 8, 3.99);

	purchaseOrder = await fetchOrder(purchaseOrder?.id);

	expect(purchaseOrder?.total, 'purchase order product total').toBe(8 * 3.99 * -1);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 8
	expect(product?.units_in_stock, 'Product units in stock').toBe(8);

	// Update the quantity of the order product
	purchaseOrderProduct = await updateOrderProduct(purchaseOrderProduct?.id, 12, 4.99);

	purchaseOrder = await fetchOrder(purchaseOrder?.id);

	expect(purchaseOrder?.total, 'purchase order product total').toBe(12 * 4.99 * -1);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 12
	expect(product?.units_in_stock, 'Product units in stock').toBe(12);

	// Associate the product with the sale order
	saleOrderProduct = await createOrderProduct(saleOrder?.id, product?.id, adminUser?.id, 5, 20);
	expect(saleOrderProduct?.id, 'order product id null').not.toBe(null);

	saleOrder = await fetchOrder(saleOrder?.id);
	expect(saleOrder?.total, 'purchase order product total').toBe(5 * 20);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 7
	expect(product?.units_in_stock, 'Product units in stock').toBe(7);

	// Update the quantity of the order product
	saleOrderProduct = await updateOrderProduct(saleOrderProduct?.id, 6, 21);

	saleOrder = await fetchOrder(saleOrder?.id);
	expect(saleOrder?.total, 'purchase order product total').toBe(126);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 6
	expect(product?.units_in_stock, 'Product units in stock').toBe(6);

	await deleteOrderProduct(saleOrderProduct?.id);

	saleOrder = await fetchOrder(saleOrder?.id);
	expect(saleOrder?.total, 'purchase order product total').toBe(0);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 12
	expect(product?.units_in_stock, 'Product units in stock').toBe(12);

	await deleteOrderProduct(purchaseOrderProduct?.id);

	purchaseOrder = await fetchOrder(purchaseOrder?.id);

	expect(purchaseOrder?.total, 'purchase order product total').toBe(0);

	// Fetch the updated product data
	product = await fetchProduct(product?.id);

	// Ensure that the product's 'units_in_stock' field is equal to 0
	expect(product?.units_in_stock, 'Product units in stock').toBe(0);
});
