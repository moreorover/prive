<script lang="ts">
	import { Button, Card, Textarea } from "flowbite-svelte";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	export let data: PageData;
	const { form, errors, enhance } = superForm(data.updateStockForm);
</script>

<div class="py-20">
	<div class="flex w-full flex-col items-center">
		<div class="max-w-2xl text-center">
			<h1 class="text-4xl font-semibold">Edit Stock</h1>
		</div>
		<Card class="mt-6 w-full" padding="xl" size="md">
			<form method="POST" action="?/updateStock" class="flex flex-col space-y-6" use:enhance>
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
					<Textarea rows="4" name="description" />
					{#if $errors.description}
						<span class="block text-red-600 dark:text-red-500">{$errors.description}</span>
					{/if}
				</label>
				<label class="space-y-2" for="weight_expected_grams">
					<span>Weight expected in grams</span>
					<input
						type="number"
						name="weight_expected_grams"
						bind:value={$form.weight_expected_grams} />
					{#if $errors.weight_expected_grams}
						<span class="block text-red-600 dark:text-red-500"
							>{$errors.weight_expected_grams}</span>
					{/if}
				</label>
				<label class="space-y-2" for="weight_received_grams">
					<span>Weight received in grams</span>
					<input
						type="number"
						name="weight_received_grams"
						bind:value={$form.weight_received_grams} />
					{#if $errors.weight_received_grams}
						<span class="block text-red-600 dark:text-red-500"
							>{$errors.weight_received_grams}</span>
					{/if}
				</label>
				<label class="space-y-2" for="code">
					<span>Code</span>
					<input type="text" name="weight_received_grams" bind:value={$form.code} />
					{#if $errors.code}
						<span class="block text-red-600 dark:text-red-500">{$errors.code}</span>
					{/if}
				</label>
				<Button type="submit" class="w-full">Save Changes</Button>
			</form>
		</Card>
	</div>
</div>
