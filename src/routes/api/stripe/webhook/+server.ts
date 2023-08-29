import { deleteCustomerRecord, updateCustomerRecord } from "$lib/server/customers";
import { deleteProductRecord, upsertProductRecord } from "$lib/server/products";
import { stripe } from "$lib/server/stripe";
import { insertSubscriptionRecord, updateSubscriptionRecord } from "$lib/server/subscriptions";
import { json } from "@sveltejs/kit";
import type Stripe from "stripe";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (event) => {
	const stripeSignature = event.request.headers.get("stripe-signature");

	if (!stripeSignature) {
		console.log("stripe -> Unauthorized");
		return json("Unauthorized", { status: 401 });
	}

	const body = await event.request.text();

	// console.log({ body });

	let stripeEvent: Stripe.DiscriminatedEvent;

	// console.log({ STRIPE_SIGNING_SECRET: ENV.STRIPE_SIGNING_SECRET });

	try {
		stripeEvent = stripe.webhooks.constructEvent(
			body,
			stripeSignature,
			"whsec_1475a70010cfc44327c11f2aad59501a95198642377911c0bd3b2ba48f8f5cdb"
		) as Stripe.DiscriminatedEvent;
	} catch (e) {
		console.error(`Invalid signature: ${e}`);
		return json("Invalid signature", { status: 401 });
	}

	try {
		switch (stripeEvent.type) {
			case "product.created":
			case "product.updated":
				console.log("Product created or updated", stripeEvent);
				await upsertProductRecord(stripeEvent.data.object);
				break;
			case "product.deleted":
				console.log("Product deleted", stripeEvent);
				await deleteProductRecord(stripeEvent.data.object);
				break;
			case "customer.updated":
				console.log("Customer updated", stripeEvent);
				await updateCustomerRecord(stripeEvent.data.object);
				break;
			case "customer.deleted":
				console.log("Customer deleted", stripeEvent);
				await deleteCustomerRecord(stripeEvent.data.object);
				break;
			case "customer.subscription.created":
				console.log("Customer Subscription created", stripeEvent);
				await insertSubscriptionRecord(stripeEvent.data.object);
				break;
			case "customer.subscription.updated":
			case "customer.subscription.deleted":
				console.log("Customer Subscription updated or deleted", stripeEvent);
				await updateSubscriptionRecord(stripeEvent.data.object);
				break;
			case "customer.subscription.trial_will_end":
				console.log("Customer Subscription trial will end", stripeEvent);
				break;
			default:
				console.warn(`Unhandled event type: ${stripeEvent.type}`);
				return json({ received: true }, { status: 200 });
		}
	} catch (e) {
		console.log(e);
		return json(`Error processing event ${stripeEvent.type}`, { status: 500 });
	}

	return json({ received: true }, { status: 200 });
};
