<script lang="ts">
	import HairCreateFormDialog from '$lib/components/HairCreateFormDialog.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';

	export let data;
</script>

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
				{#each data.hair as hair, i (i)}
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
