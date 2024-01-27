<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { setOrderTotalSchema, type SetOrderTotalSchema } from '$lib/schema/orderSchema';
	import type { FormOptions } from 'formsnap';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<SetOrderTotalSchema>;

	let openDialog: boolean = false;

	const options: FormOptions<typeof setOrderTotalSchema> = {
		validators: setOrderTotalSchema,
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
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Set Order Total</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Select Order Total</Dialog.Title>
			<Dialog.Description>
				Make changes to your order here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<Form.Root
			{form}
			schema={setOrderTotalSchema}
			let:config
			{options}
			method="POST"
			action="?/setOrderTotal"
			class="space-y-6"
		>
			<fieldset>
				<div class="space-y-4">
					<Form.Field {config} name="total">
						<Form.Item class="flex flex-row items-center justify-between rounded-lg border p-4">
							<div class="space-y-0.5">
								<Form.Label>Order Total</Form.Label>
								<Form.Description>Set Order Total amount.</Form.Description>
								<Form.Input />
								<Form.Description>This is your public display name.</Form.Description>
								<Form.Validation />
							</div>
						</Form.Item>
					</Form.Field>
				</div>
			</fieldset>
			<Form.Button>Submit</Form.Button>
		</Form.Root>
		<!--		<Dialog.Footer>-->
		<!--			<Button type="submit">Save changes</Button>-->
		<!--		</Dialog.Footer>-->
	</Dialog.Content>
</Dialog.Root>
