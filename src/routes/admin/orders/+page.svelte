<script lang="ts">
	import type { PageData } from './$types';
	import OrderCreateFormDialog from '$lib/components/OrderCreateFormDialog.svelte';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';

	export let data: PageData;

	type Order = {
		id: string;
		title: string;
		total: number | null;
		completed: boolean;
	};

	const searchOrders: Order[] = data.orders.map((order: Order) => ({
		...order,
		searchTerms: `${order.title}`
	}));

	const searchStore = createSearchStore(searchOrders);

	$: {
		$searchStore.data = data.orders.map((order: Order) => ({
			...order,
			searchTerms: `${order.title}`
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
				<Card.Title data-testid="orders-title">Orders</Card.Title>
				<Card.Description>List of Orders</Card.Description>
			</div>
			<div class="flex items-center space-x-2">
				<Input
					type="search"
					placeholder="Search"
					class="max-w-xs"
					bind:value={$searchStore.search}
				/>
				{#if data.roles.includes('Admin')}
					<OrderCreateFormDialog form={data.createOrderForm} />
				{/if}
			</div>
		</div>
	</Card.Header>
	<Card.Content class="grid gap-6" data-testid="order-rows">
		{#each $searchStore.filtered as order}
			<div class="space-y-8">
				<div class="flex items-center justify-between">
					<div class="space-y-1">
						<div class="flex">
							<p class="text-sm font-medium leading-none" data-testid="order-title">
								{order.title}
							</p>
							{#if order.completed}
								<span class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-[#000000]"
									>Completed</span
								>
							{:else}
								<span class="ml-2 rounded-md bg-[#faad1d] px-1.5 py-0.5 text-xs text-[#000000]"
									>In Progress</span
								>
							{/if}
							<p class="ml-auto font-medium" data-testid="order-total">
								{order.total ? `£${order.total}` : ''}
							</p>
						</div>
					</div>
					<Button
						variant="secondary"
						href={`/admin/orders/${order.id}`}
						data-testid="order-view-{order.id}">View</Button
					>
				</div>
			</div>
		{/each}
	</Card.Content>
</Card.Root>
