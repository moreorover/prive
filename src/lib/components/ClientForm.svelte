<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { clientSchema, type ClientSchema } from '$lib/schema/clientSchema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import { redirect } from '@sveltejs/kit';
	export let form: SuperValidated<ClientSchema>;
</script>

<Form.Root method="POST" {form} schema={clientSchema} let:config>
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
