<script lang="ts">
	import type { PageData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { loginSchema, type LoginSchema } from '$lib/schema/loginSchema';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let data: PageData;

	let form: SuperValidated<LoginSchema> = data.form;
</script>

<div class="container">
	<h1>Login</h1>
	<Form.Root method="POST" {form} schema={loginSchema} let:config>
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="password">
			<Form.Item>
				<Form.Label>Password</Form.Label>
				<Form.Input type="password" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button>Login</Form.Button>
	</Form.Root>
</div>
