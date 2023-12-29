<script lang="ts">
	import type { PageData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { loginSchema, type LoginSchema } from '$lib/schema/loginSchema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { type FormOptions } from 'formsnap';

	export let data: PageData;

	const options: FormOptions<typeof loginSchema> = {
		validators: loginSchema,
		onResult: (result) => {
			console.log(result);
		}
	};

	let form: SuperValidated<LoginSchema> = data.form;
</script>

<div class="container">
	<h1>Login</h1>
	<Form.Root
		method="POST"
		{options}
		{form}
		schema={loginSchema}
		let:config
		data-testid="login-form"
	>
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email</Form.Label>
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
		<Form.Button>Login</Form.Button>
	</Form.Root>
</div>
