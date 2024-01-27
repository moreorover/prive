<script lang="ts">
	import HairCreateFormDialog from '$lib/components/HairCreateFormDialog.svelte';
	import SelectClientDialog from '$lib/components/SelectClientDialog.svelte';
	import SetOrderStatusDialog from '$lib/components/SetOrderStatusDialog.svelte';
	import SetOrderTotalDialog from '$lib/components/SetOrderTotalDialog.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import * as Table from '$lib/components/ui/table';
	import { utcToReadableDate } from '$lib/utils';

	export let data;
</script>

<div class="grid lg:grid-cols-2">
	<Card.Root>
		<Card.Header>
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
					<span class="text-xs font-normal leading-snug text-muted-foreground"> Total </span>
					<span>£{data.order.total}</span>
				</Label>
				<!--			<Switch id="necessary" checked aria-label="Necessary" />-->
				<SetOrderTotalDialog form={data.setOrderTotalForm} />
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
		</Card.Content>
		<!--	<Card.Footer>-->
		<!--		<Button variant="outline" class="w-full">Save preferences</Button>-->
		<!--	</Card.Footer>-->
	</Card.Root>
</div>

<Card.Root class="pt-5 mt-4">
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
		<Table.Root>
			<Table.Caption>A list of your hair.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Title</Table.Head>
					<Table.Head class="w-[100px]">Description</Table.Head>
					<Table.Head class="w-[100px]">Weight</Table.Head>
					<Table.Head class="w-[100px]">Length</Table.Head>
					<Table.Head class="w-[100px]">Price</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.order?.hair as hair, i (i)}
					<Table.Row>
						<Table.Cell class="font-medium">{hair.title}</Table.Cell>
						<Table.Cell class="font-medium">{hair.description}</Table.Cell>
						<Table.Cell class="font-medium">{hair.weight} g</Table.Cell>
						<Table.Cell class="font-medium">{hair.length} cm</Table.Cell>
						<Table.Cell class="font-medium">£{hair.price}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
