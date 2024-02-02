<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { clientSchema, type ClientSchema } from '$lib/schema/clientSchema';
	import type { FormOptions } from 'formsnap';
	import type { SuperValidated } from 'sveltekit-superforms';
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
			<Dialog.Title data-testid="create-client-dialog-title">Create Client</Dialog.Title>
			<Dialog.Description>
				Enter new Client details. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<Form.Root
			method="POST"
			{options}
			{form}
			schema={clientSchema}
			let:config
			data-testid="create-client-dialog-form"
		>
			<Form.Field {config} name="name">
				<Form.Item>
					<Form.Label>Full Name</Form.Label>
					<Form.Input data-testid="create-client-dialog-form-name" />
					<Form.Description>Clients full name. (required)</Form.Description>
					<Form.Validation data-testid="create-client-dialog-form-name-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="email">
				<Form.Item>
					<Form.Label>Email</Form.Label>
					<Form.Input data-testid="create-client-dialog-form-email" />
					<Form.Description>Clients email address. (optional)</Form.Description>
					<Form.Validation data-testid="create-client-dialog-form-email-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="phone">
				<Form.Item>
					<Form.Label>Phone Number</Form.Label>
					<Form.Input data-testid="create-client-dialog-form-phone" />
					<Form.Description>Clients phone number. (optional)</Form.Description>
					<Form.Validation data-testid="create-client-dialog-form-phone-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="instagram">
				<Form.Item>
					<Form.Label>Instagram</Form.Label>
					<Form.Input data-testid="create-client-dialog-form-instagram" />
					<Form.Description>Clients instagram tag. (optional)</Form.Description>
					<Form.Validation data-testid="create-client-dialog-form-instagram-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="abbreviation">
				<Form.Item>
					<Form.Label>Abbreviation</Form.Label>
					<Form.Input data-testid="create-client-dialog-form-abbreviation" />
					<Form.Description>Clients abbreviation. (optional)</Form.Description>
					<Form.Validation data-testid="create-client-dialog-form-abbreviation-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Button data-testid="create-client-dialog-form-submit">Submit</Form.Button>
		</Form.Root>
	</Dialog.Content>
</Dialog.Root>
