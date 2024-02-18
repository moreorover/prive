<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import * as Popover from '$lib/components/ui/popover';
	import { productAddToOrderSchema, type ProductAddToOrderSchema } from '$lib/schema/productSchema';
	import { cn } from '$lib/utils';
	import type { FormOptions } from 'formsnap';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { tick } from 'svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<ProductAddToOrderSchema>;
	export let products: { title: string; id: string }[];
	let openDialog = false;
	let openProductSelect = false;

	const options: FormOptions<typeof productAddToOrderSchema> = {
		validators: productAddToOrderSchema,
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

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		openProductSelect = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Dialog.Root bind:open={openDialog}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })} data-testid="create-product"
		>Select Product</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title data-testid="create-product-dialog-title">Select Product</Dialog.Title>
			<Dialog.Description>Enter Product details. Click save when you're done.</Dialog.Description>
		</Dialog.Header>
		<Form.Root
			method="POST"
			action="?/addProduct"
			{options}
			{form}
			class="space-y-6"
			schema={productAddToOrderSchema}
			let:config
			data-testid="create-product-dialog-form"
		>
			<Form.Field {config} name="productId" let:setValue let:value>
				<Form.Item class="flex flex-col">
					<Form.Label>Product</Form.Label>
					<Popover.Root bind:open={openProductSelect} let:ids>
						<Popover.Trigger asChild let:builder>
							<Form.Control id={ids.trigger} let:attrs>
								<Button
									builders={[builder]}
									{...attrs}
									variant="outline"
									role="combobox"
									type="button"
									class={cn('w-[200px] justify-between', !value && 'text-muted-foreground')}
								>
									{products.find((f) => f.id === value)?.title ?? 'Select product'}
									<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</Form.Control>
						</Popover.Trigger>
						<Popover.Content class="w-[200px] p-0">
							<Command.Root>
								<Command.Input autofocus placeholder="Search product..." />
								<Command.Empty>No product found.</Command.Empty>
								<Command.Group>
									{#each products as product}
										<Command.Item
											value={product.id}
											onSelect={() => {
												setValue(product.id);
												closeAndFocusTrigger(ids.trigger);
											}}
										>
											<Check
												class={cn('mr-2 h-4 w-4', product.id !== value && 'text-transparent')}
											/>
											{product.title}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
					<Form.Description>This is the product that will be added to order.</Form.Description>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<!-- <Form.Field {config} name="title">
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
			</Form.Field> -->
			<Form.Button data-testid="create-product-dialog-form-submit">Submit</Form.Button>
		</Form.Root>
	</Dialog.Content>
</Dialog.Root>
