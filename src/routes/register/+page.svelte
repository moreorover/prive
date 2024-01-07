<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { registerSchema, type RegisterSchema } from '$lib/schema/loginSchema';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let data;

	let form: SuperValidated<RegisterSchema> = data.form;
</script>

<div class="container">
	<h1>Register</h1>
	<Form.Root method="POST" {form} schema={registerSchema} let:config data-testid="register-form">
		<Form.Field {config} name="full_name">
			<Form.Item>
				<Form.Label>Full Name</Form.Label>
				<Form.Input data-testid="full_name" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email address</Form.Label>
				<Form.Input data-testid="email" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="password">
			<Form.Item>
				<Form.Label>Password</Form.Label>
				<Form.Input type="password" data-testid="password" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="passwordConfirm">
			<Form.Item>
				<Form.Label>Confirm Password</Form.Label>
				<Form.Input type="password" data-testid="passwordConfirm" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button>Register</Form.Button>
	</Form.Root>
</div>
