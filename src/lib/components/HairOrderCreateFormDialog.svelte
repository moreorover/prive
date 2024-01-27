<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { hairOrderSchema, type HairOrderSchema } from '$lib/schema/orderSchema';
	import type { FormOptions } from 'formsnap';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<HairOrderSchema>;
	let openDialog: boolean = false;

	const options: FormOptions<typeof hairOrderSchema> = {
		validators: hairOrderSchema,
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
			<Dialog.Title data-testid="create-order-dialog-title">Create Hair Order</Dialog.Title>
			<Dialog.Description>Please confirm to create new Hair Order.</Dialog.Description>
		</Dialog.Header>
		<Form.Root
			method="POST"
			{options}
			{form}
			schema={hairOrderSchema}
			let:config
			data-testid="create-order-dialog-form"
		>
			<!-- <Form.Field {config} create="title">
				<Form.Item>
					<Form.Label>Title</Form.Label>
					<Form.Switch />
					<Form.Description>Hair title. (required)</Form.Description>
					<Form.Validation data-testid="create-hair-dialog-form-name-validation" />
				</Form.Item>
			</Form.Field> -->
			<Form.Button data-testid="create-order-dialog-form-submit">Submit</Form.Button>
		</Form.Root>
	</Dialog.Content>
</Dialog.Root>
