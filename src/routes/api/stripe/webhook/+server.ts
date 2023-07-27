import { ENV } from "$lib/server/env";
import { stripe } from "$lib/server/stripe";
import { json } from "@sveltejs/kit";
import type Stripe from "stripe";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (event) => {
	const stripeSignature = event.request.headers.get("stripe-signature");

	console.log({ stripeSignature });

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
			ENV.STRIPE_SIGNING_SECRET
		) as Stripe.DiscriminatedEvent;
	} catch (e) {
		console.log("stripe -> Invalid Signature");
		return json("Invalid signature", { status: 401 });
	}

	try {
		console.log(`stripe event -> ${stripeEvent.type}`);
		switch (stripeEvent.type) {
			case "product.created":
				console.log("Product created", stripeEvent);
				break;
			case "product.updated":
				console.log("Product updated", stripeEvent);
				break;
			case "product.deleted":
				console.log("Product deleted", stripeEvent);
				break;
			case "customer.updated":
				console.log("customer updated", stripeEvent);
				break;
			case "customer.deleted":
				console.log("Customer deleted", stripeEvent);
				break;
			case "customer.subscription.created":
				console.log("Customer Subscription created", stripeEvent);
				break;
			case "customer.subscription.updated":
				console.log("Customer Subscription updated", stripeEvent);
				break;
			case "customer.subscription.deleted":
				console.log("Customer Subscription deleted", stripeEvent);
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
