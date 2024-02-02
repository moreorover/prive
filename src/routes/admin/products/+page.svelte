<script lang="ts">
	import ProductCreateFormDialog from '$lib/components/ProductCreateFormDialog.svelte';
	import * as Table from '$lib/components/ui/table';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';

	export let data;

	type Product = {
		id: string;
		title: string;
		description: string;
		upc: string;
		rrp: number;
		units_in_stock: number;
	};

	const searchProducts: Product[] = data.orders.map((product) => ({
		...product,
		searchTerms: `${product.id} ${product.title} ${product.description} ${product.upc} ${product.rrp} ${product.units_in_stock}`
	}));

	const searchStore = createSearchStore(searchProducts);

	$: {
		$searchStore.data = data.orders.map((product) => ({
			...product,
			searchTerms: `${product.id} ${product.title} ${product.description} ${product.upc} ${product.rrp} ${product.units_in_stock}`
		}));
	}

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<Card.Root>
	<Card.Header data-testid="orders-header">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<Card.Title data-testid="orders-title">Products</Card.Title>
				<Card.Description>List of Products</Card.Description>
			</div>
			<div class="flex items-center space-x-2">
				<Input
					type="search"
					placeholder="Search"
					class="max-w-xs"
					bind:value={$searchStore.search}
				/>
				{#if data.roles.includes('Admin')}
					<ProductCreateFormDialog form={data.createProductForm} />
				{/if}
			</div>
		</div>
	</Card.Header>

	<Table.Root>
		<Table.Caption>A list of your recent orders.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="text-left">Title</Table.Head>
				<Table.Head class="text-left">RRP</Table.Head>
				<Table.Head class="text-left">In Stock</Table.Head>
				<Table.Head class="text-left">In Stock</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $searchStore.filtered as product, i (i)}
				<Table.Row>
					<Table.Cell class="font-medium">{product.title}</Table.Cell>
					<Table.Cell>{product.rrp}</Table.Cell>
					<Table.Cell>{product.units_in_stock}</Table.Cell>
					<Table.Cell
						><Button
							variant="secondary"
							href={`/admin/products/${product.id}`}
							data-testid="order-view-{product.id}">View</Button
						></Table.Cell
					>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</Card.Root>
