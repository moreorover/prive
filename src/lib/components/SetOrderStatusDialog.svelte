<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog';
	import { setOrderStatusSchema, type SetOrderStatusSchema } from '$lib/schema/orderSchema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { FormOptions } from 'formsnap';
	import { buttonVariants } from '$lib/components/ui/button';
	export let form: SuperValidated<SetOrderStatusSchema>;

	let openDialog: boolean = false;

	const options: FormOptions<typeof setOrderStatusSchema> = {
		validators: setOrderStatusSchema,
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
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Set Order Status</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Select Order Status</Dialog.Title>
			<Dialog.Description>
				Make changes to your order here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<Form.Root
			{form}
			schema={setOrderStatusSchema}
			let:config
			{options}
			method="POST"
			action="?/setOrderStatus"
			class="space-y-6"
		>
			<fieldset>
				<div class="space-y-4">
					<Form.Field {config} name="completed">
						<Form.Item class="flex flex-row items-center justify-between rounded-lg border p-4">
							<div class="space-y-0.5">
								<Form.Label>Order Status</Form.Label>
								<Form.Description>Switch it between completed or pending.</Form.Description>
							</div>
							<Form.Switch />
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
