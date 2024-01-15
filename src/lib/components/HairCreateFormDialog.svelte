<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { hairSchema, type HairSchema } from '$lib/schema/hairSchema';
	import type { FormOptions } from 'formsnap';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<HairSchema>;
	let openDialog: boolean = false;

	const options: FormOptions<typeof hairSchema> = {
		validators: hairSchema,
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
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })} data-testid="create-hair"
		>Create Client</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title data-testid="create-hair-dialog-title">Create Client</Dialog.Title>
			<Dialog.Description>
				Enter new Client details. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<Form.Root
			method="POST"
			action="?/createHair"
			{options}
			{form}
			schema={hairSchema}
			let:config
			data-testid="create-hair-dialog-form"
		>
			<Form.Field {config} name="title">
				<Form.Item>
					<Form.Label>Title</Form.Label>
					<Form.Input data-testid="create-hair-dialog-form-name" />
					<Form.Description>Hair title. (required)</Form.Description>
					<Form.Validation data-testid="create-hair-dialog-form-name-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="description">
				<Form.Item>
					<Form.Label>Description</Form.Label>
					<Form.Textarea data-testid="create-hair-dialog-form-email" />
					<Form.Description>Hair description. (optional)</Form.Description>
					<Form.Validation data-testid="create-hair-dialog-form-email-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="weight">
				<Form.Item>
					<Form.Label>Weight</Form.Label>
					<Form.Input data-testid="create-hair-dialog-form-phone" />
					<Form.Description>Hair weight in grams.</Form.Description>
					<Form.Validation data-testid="create-hair-dialog-form-phone-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="length">
				<Form.Item>
					<Form.Label>Lenth</Form.Label>
					<Form.Input data-testid="create-hair-dialog-form-instagram" />
					<Form.Description>Hair length in centimeters.</Form.Description>
					<Form.Validation data-testid="create-hair-dialog-form-instagram-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Button data-testid="create-hair-dialog-form-submit">Submit</Form.Button>
		</Form.Root>
	</Dialog.Content>
</Dialog.Root>
