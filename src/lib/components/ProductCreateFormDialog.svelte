<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { productSchema, type ProductSchema } from '$lib/schema/productSchema';
	import type { FormOptions } from 'formsnap';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<ProductSchema>;
	let openDialog: boolean = false;

	const options: FormOptions<typeof productSchema> = {
		validators: productSchema,
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
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })} data-testid="create-product"
		>Create Product</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title data-testid="create-product-dialog-title">Create Product</Dialog.Title>
			<Dialog.Description
				>Enter new Product details. Click save when you're done.</Dialog.Description
			>
		</Dialog.Header>
		<Form.Root
			method="POST"
			{options}
			{form}
			schema={productSchema}
			let:config
			data-testid="create-product-dialog-form"
		>
			<Form.Field {config} name="title">
				<Form.Item>
					<Form.Label>Title</Form.Label>
					<Form.Input data-testid="create-product-dialog-form-title" />
					<Form.Description>Product title. (required)</Form.Description>
					<Form.Validation data-testid="create-product-dialog-form-title-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="description">
				<Form.Item>
					<Form.Label>Description</Form.Label>
					<Form.Textarea data-testid="create-product-dialog-form-title" />
					<Form.Description>Product description. (optional)</Form.Description>
					<Form.Validation data-testid="create-product-dialog-form-title-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="upc">
				<Form.Item>
					<Form.Label>UPC</Form.Label>
					<Form.Input data-testid="create-product-dialog-form-title" />
					<Form.Description>Product UPC. (optional)</Form.Description>
					<Form.Validation data-testid="create-product-dialog-form-title-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="rrp">
				<Form.Item>
					<Form.Label>RRP</Form.Label>
					<Form.Input data-testid="create-product-dialog-form-title" />
					<Form.Description>Product rrp. (optional)</Form.Description>
					<Form.Validation data-testid="create-product-dialog-form-title-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="supplier_id">
				<Form.Item>
					<Form.Label>Supplier</Form.Label>
					<Form.Input data-testid="create-product-dialog-form-title" />
					<Form.Description>Product Supplier. (optional)</Form.Description>
					<Form.Validation data-testid="create-product-dialog-form-title-validation" />
				</Form.Item>
			</Form.Field>
			<Form.Button data-testid="create-product-dialog-form-submit">Submit</Form.Button>
		</Form.Root>
	</Dialog.Content>
</Dialog.Root>
