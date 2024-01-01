<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog';
	import { orderSchema, type OrderSchema } from '$lib/schema/orderSchema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { FormOptions } from 'formsnap';
	import { buttonVariants } from '$lib/components/ui/button';
	export let form: SuperValidated<OrderSchema>;
	let openDialog: boolean = false;

	const options: FormOptions<typeof orderSchema> = {
		validators: orderSchema,
		resetForm: true,
		onResult: (event) => {
			// console.log(event);
			console.log(event.result.type);
			if (event.result.type == 'failure') {
				console.log('form failed');
			}
			if (event.result.type == 'success') {
				console.log('form success');
				openDialog = false;
			}
		}
	};
</script>

<Dialog.Root bind:open={openDialog}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })} data-testid="create-order"
		>Create Order</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title data-testid="create-order-dialog-title">Create Order</Dialog.Title>
			<Dialog.Description>Enter new Order details. Click save when you're done.</Dialog.Description>
		</Dialog.Header>
		<Form.Root
			method="POST"
			{options}
			{form}
			schema={orderSchema}
			let:config
			data-testid="create-order-dialog-form"
		>
			<Form.Field {config} name="title">
				<Form.Item>
					<Form.Label>Title</Form.Label>
					<Form.Input data-testid="create-order-dialog-form-title" />
					<Form.Description>Order title. (required)</Form.Description>
					<Form.Validation data-testid="create-order-dialog-form-title-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Button data-testid="create-order-dialog-form-submit">Submit</Form.Button>
		</Form.Root>
	</Dialog.Content>
</Dialog.Root>
