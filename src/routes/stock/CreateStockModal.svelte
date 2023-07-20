<script lang="ts">
	import type { CreateStockSchema } from "$lib/schemas";
	import { Button, Modal } from "flowbite-svelte";
	import { superForm } from "sveltekit-superforms/client";
	import type { Validation } from "sveltekit-superforms/index";
	export let data: Validation<CreateStockSchema>;
	export let open = false;
	const { form, errors, enhance } = superForm(data, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === "success") {
				open = false;
				return;
			}
		}
	});
</script>

<Modal bind:open size="xs" autoclose={false} class="w-full">
	<form method="POST" action="?/createStock" class="flex flex-col space-y-6" use:enhance>
		<h3 class="text-xl font-medium">Create a Stock</h3>
		{#if $errors._errors}
			<span class="block text-red-600 dark:text-red-500">{$errors._errors}</span>
		{/if}
		<label class="space-y-2" for="purchased_at">
			<span>Purchased At</span>
			<input type="date" name="purchased_at" bind:value={$form.purchased_at} />
			{#if $errors.purchased_at}
				<span class="block text-red-600 dark:text-red-500">{$errors.purchased_at}</span>
			{/if}
		</label>
		<label class="space-y-2" for="length_cm">
			<span>Length (cm)</span>
			<input type="number" name="length_cm" bind:value={$form.length_cm} />
			{#if $errors.length_cm}
				<span class="block text-red-600 dark:text-red-500">{$errors.length_cm}</span>
			{/if}
		</label>
		<label class="space-y-2" for="colour">
			<span>Colour</span>
			<input type="text" name="colour" bind:value={$form.colour} />
			{#if $errors.colour}
				<span class="block text-red-600 dark:text-red-500">{$errors.colour}</span>
			{/if}
		</label>
		<label class="space-y-2" for="description">
			<span>Description</span>
			<input type="text" name="description" bind:value={$form.description} />
			{#if $errors.description}
				<span class="block text-red-600 dark:text-red-500">{$errors.description}</span>
			{/if}
		</label>
		<label class="space-y-2" for="weight_expected_grams">
			<span>Weight expected in grams</span>
			<input type="number" name="weight_expected_grams" bind:value={$form.weight_expected_grams} />
			{#if $errors.weight_expected_grams}
				<span class="block text-red-600 dark:text-red-500">{$errors.weight_expected_grams}</span>
			{/if}
		</label>
		<label class="space-y-2" for="weight_received_grams">
			<span>Weight received in grams</span>
			<input type="number" name="weight_received_grams" bind:value={$form.weight_received_grams} />
			{#if $errors.weight_received_grams}
				<span class="block text-red-600 dark:text-red-500">{$errors.weight_received_grams}</span>
			{/if}
		</label>
		<label class="space-y-2" for="code">
			<span>Code</span>
			<input type="text" name="weight_received_grams" bind:value={$form.code} />
			{#if $errors.code}
				<span class="block text-red-600 dark:text-red-500">{$errors.code}</span>
			{/if}
		</label>
		<Button type="submit" class="w-full">Create Stock</Button>
	</form>
</Modal>
