<script lang="ts">
	import OrderCreateFormDialog from '$lib/components/OrderCreateFormDialog.svelte';
	import * as Table from '$lib/components/ui/table';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';

	export let data;

	type Order = {
		id: string;
		order_type: string;
		clients: string;
		total: number | null;
		completed: boolean;
	};

	const searchOrders: Order[] = data.orders.map((order) => ({
		...order,
		searchTerms: `${order.order_type} ${order.order_status}`
	}));

	const searchStore = createSearchStore(searchOrders);

	$: {
		$searchStore.data = data.orders.map((order) => ({
			...order,
			searchTerms: `${order.ordertype} ${order.completed ? 'completed' : 'in progress'}`
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

	<Table.Root>
		<Table.Caption>A list of your recent orders.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Type</Table.Head>
				<Table.Head class="text-left">Status</Table.Head>
				<Table.Head class="text-left">Client</Table.Head>
				<Table.Head class="text-left">Amount</Table.Head>
				<Table.Head class="text-right">View</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $searchStore.filtered as invoice, i (i)}
				<Table.Row>
					<Table.Cell class="font-medium">{invoice.order_type}</Table.Cell>
					<Table.Cell>
						{#if invoice.order_status == 'pending'}
							<span
								class="ml-2 rounded-md bg-[#faad1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline"
							>
								Pending
							</span>
						{:else if invoice.order_status == 'completed'}
							<span
								class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline"
								>Completed</span
							>
						{:else if invoice.order_status == 'cancelled'}
							<span
								class="ml-2 rounded-md bg-[#7372d8] px-1.5 py-0.5 text-xs leading-none text-[#ffffff] no-underline group-hover:no-underline"
								>Cancelled</span
							>
						{/if}
					</Table.Cell>
					<Table.Cell>{invoice.clients ? invoice.clients.name : ''}</Table.Cell>
					<Table.Cell>£{invoice.total}</Table.Cell>
					<Table.Cell class="text-right"
						><Button
							variant="secondary"
							href={`/admin/orders/${invoice.id}`}
							data-testid="order-view-{invoice.id}">View</Button
						></Table.Cell
					>
					<!--					<Table.Cell>{JSON.stringify(invoice)}</Table.Cell>-->
					<!--					<Table.Cell>{invoice.paymentMethod}</Table.Cell>-->
					<!--					<Table.Cell class="text-right">{invoice.totalAmount}</Table.Cell>-->
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</Card.Root>
