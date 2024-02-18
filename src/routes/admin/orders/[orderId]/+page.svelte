<script lang="ts">
	import HairCreateFormDialog from '$lib/components/HairCreateFormDialog.svelte';
	import SelectClientDialog from '$lib/components/SelectClientDialog.svelte';
	import SetOrderStatusDialog from '$lib/components/SetOrderStatusDialog.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import * as Table from '$lib/components/ui/table';
	import { utcToReadableDate } from '$lib/utils';

	export let data;
</script>

<div class="grid lg:grid-cols-2">
	<Card.Root>
		<Card.Header>
			<Card.Title>Order: {data.order.id}</Card.Title>
			<Card.Description>Manage your Order here.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-6">
			<div class="flex items-center justify-between space-x-2">
				<Label for="necessary" class="flex flex-col space-y-1">
					<span class="text-xs font-normal leading-snug text-muted-foreground">
						Created By At:
					</span>
					<span
						>{data.order.created_by.full_name} at {utcToReadableDate(data.order.created_at)}</span
					>
				</Label>
				<!--			<Switch id="necessary" checked aria-label="Necessary" />-->
			</div>
			{#if data.order.updated_by}
				<div class="flex items-center justify-between space-x-2">
					<Label for="necessary" class="flex flex-col space-y-1">
						<span class="text-xs font-normal leading-snug text-muted-foreground">
							Updated By At:
						</span>
						<span
							>{data.order.updated_by?.full_name} at {utcToReadableDate(
								data.order.updated_at
							)}</span
						>
					</Label>
					<!--			<Switch id="necessary" checked aria-label="Necessary" />-->
				</div>
			{/if}
			<div class="flex items-center justify-between space-x-2">
				<Label for="necessary" class="flex flex-col space-y-1">
					<span class="text-xs font-normal leading-snug text-muted-foreground"> Client </span>
					<span>{data.order.clients ? data.order.clients?.name : 'Not Selected'}</span>
				</Label>
				<!--			<Switch id="necessary" checked aria-label="Necessary" />-->
				<SelectClientDialog
					form={data.selectClientForm}
					clients={data.clients}
					disabled={data.order?.completed}
				/>
			</div>
			<div class="flex items-center justify-between space-x-2">
				<Label for="necessary" class="flex flex-col space-y-1">
					<span class="text-xs font-normal leading-snug text-muted-foreground">
						Completed Status
					</span>
					<span>{data.order.completed ? 'Completed' : 'Pending'}</span>
				</Label>
				<!--			<Switch id="necessary" checked aria-label="Necessary" />-->
				<SetOrderStatusDialog form={data.setOrderStatusForm} />
			</div>
			<div class="flex items-center justify-between space-x-2">
				<Label for="necessary" class="flex flex-col space-y-1">
					<span class="text-xs font-normal leading-snug text-muted-foreground"> Total </span>
					<span>£ {data.order?.total}</span>
				</Label>
			</div>
		</Card.Content>
		<!--	<Card.Footer>-->
		<!--		<Button variant="outline" class="w-full">Save preferences</Button>-->
		<!--	</Card.Footer>-->
	</Card.Root>
</div>

<Card.Root class="mt-4">
	<Card.Header data-testid="orders-header">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<Card.Title data-testid="orders-title">Hair</Card.Title>
				<Card.Description>Add Hair to this order.</Card.Description>
			</div>
			<div class="flex items-center space-x-2">
				{#if data.roles.includes('Admin')}
					<HairCreateFormDialog form={data.createHairForm} />
				{/if}
			</div>
		</div>
	</Card.Header>
	<Card.Content>
		{JSON.stringify(data.order?.order_hair)}
	</Card.Content>
</Card.Root>

<Card.Root class="mt-4">
	<Card.Header data-testid="orders-header">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<Card.Title data-testid="orders-title">Products</Card.Title>
				<Card.Description>Add Products to this order.</Card.Description>
			</div>
			<div class="flex items-center space-x-2">
				{#if data.roles.includes('Admin')}
					<HairCreateFormDialog form={data.createHairForm} />
				{/if}
			</div>
		</div>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Caption>A list of your recent orders.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="text-left">Title</Table.Head>
					<Table.Head class="text-left">Quantity</Table.Head>
					<Table.Head class="text-left">Unit Price</Table.Head>
					<Table.Head class="text-left">Total</Table.Head>
					<Table.Head class="text-left">View</Table.Head>
					<Table.Head class="text-left">Units in Stock</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.order?.order_products as product, i (i)}
					<Table.Row>
						<Table.Cell class="font-medium">{product?.products.title}</Table.Cell>
						<Table.Cell>{product?.quantity}</Table.Cell>
						<Table.Cell>£ {product?.unit_price}</Table.Cell>
						<Table.Cell>£ {product?.quantity * product?.unit_price}</Table.Cell>
						<Table.Cell>
							<Button
								variant="secondary"
								href={`/admin/products/${product?.product_id}`}
								data-testid="order-view-{product?.product_id}"
							>
								View
							</Button>
						</Table.Cell>
						<Table.Cell>{product?.products.units_in_stock}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
