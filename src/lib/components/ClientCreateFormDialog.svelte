<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog';
	import { clientSchema, type ClientSchema } from '$lib/schema/clientSchema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { FormOptions } from 'formsnap';
	import { buttonVariants } from '$lib/components/ui/button';
	export let form: SuperValidated<ClientSchema>;
	let openDialog: boolean = false;

	const options: FormOptions<typeof clientSchema> = {
		validators: clientSchema,
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
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })} data-testid="create-client"
		>Create Client</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create Client</Dialog.Title>
			<Dialog.Description>
				Enter new Client details. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<Form.Root method="POST" {options} {form} schema={clientSchema} let:config>
			<Form.Field {config} name="name">
				<Form.Item>
					<Form.Label>Full Name</Form.Label>
					<Form.Input />
					<Form.Description>Clients full name. (required)</Form.Description>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="email">
				<Form.Item>
					<Form.Label>Email</Form.Label>
					<Form.Input />
					<Form.Description>Clients email address. (optional)</Form.Description>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="phone">
				<Form.Item>
					<Form.Label>Phone Number</Form.Label>
					<Form.Input />
					<Form.Description>Clients phone number. (optional)</Form.Description>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="instagram">
				<Form.Item>
					<Form.Label>Instagram</Form.Label>
					<Form.Input />
					<Form.Description>Clients instagram tag. (optional)</Form.Description>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Button>Submit</Form.Button>
		</Form.Root>
	</Dialog.Content>
</Dialog.Root>
