<script lang="ts">
	import {
		Button,
		Dropdown,
		DropdownItem,
		MenuButton,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from "flowbite-svelte";
	import type { PageData } from "./$types";
	import CreateStockModal from "./CreateStockModal.svelte";
	import DeleteStockModal from "./DeleteStockModal.svelte";
	export let data: PageData;
	let createStockOpen = false;
	let deleteStockOpen = false;
	let stockToDelete: string;

	function handleStockDelete(stock_id: string) {
		stockToDelete = stock_id;
		deleteStockOpen = true;
	}
</script>

<div class="py-20">
	<!-- Stocks Page Header -->
	<div class="flex w-full items-center justify-between pb-6">
		<h1 class="text-3xl">Stocks</h1>
		<Button size="sm" on:click={() => (createStockOpen = true)}>New Stock</Button>
	</div>
	<!-- Stocks Table -->
	<Table shadow divClass="min-h-full">
		<TableHead>
			<TableHeadCell>Purchased At</TableHeadCell>
			<TableHeadCell>Lentght</TableHeadCell>
			<TableHeadCell>Colour</TableHeadCell>
			<TableHeadCell>Description</TableHeadCell>
			<TableHeadCell>Weight Expected</TableHeadCell>
			<TableHeadCell>Weight Received</TableHeadCell>
			<TableHeadCell>Code</TableHeadCell>
			<TableHeadCell>Created By</TableHeadCell>
			<TableHeadCell>Updated By</TableHeadCell>
			<TableHeadCell />
		</TableHead>
		<TableBody>
			{#each data.stock as stock, _i (stock.id)}
				<TableBodyRow>
					<TableBodyCell>{stock.purchased_at ?? "--"}</TableBodyCell>
					<TableBodyCell>{stock.length_cm + " cm" ?? "--"}</TableBodyCell>
					<TableBodyCell>{stock.colour ?? "--"}</TableBodyCell>
					<TableBodyCell>{stock.description ?? "--"}</TableBodyCell>
					<TableBodyCell>{stock.weight_expected_grams + " g" ?? "--"}</TableBodyCell>
					<TableBodyCell>{stock.weight_received_grams + " g" ?? "--"}</TableBodyCell>
					<TableBodyCell>{stock.code ?? "--"}</TableBodyCell>
					<TableBodyCell>{stock.created_by?.full_name ?? "--"}</TableBodyCell>
					<TableBodyCell>{stock.updated_by?.full_name ?? "--"}</TableBodyCell>
					<TableBodyCell>
						<MenuButton class="dots-menu dark:text-white" vertical name="Stock Menu" />
						<Dropdown placement="left-start">
							<DropdownItem href="/stock/{stock.id}">Edit</DropdownItem>
							<DropdownItem slot="footer" on:click={() => handleStockDelete(stock.id)}
								>Delete</DropdownItem>
						</Dropdown>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
<CreateStockModal bind:open={createStockOpen} data={data.createStockForm} />
<DeleteStockModal bind:open={deleteStockOpen} stockId={stockToDelete} data={data.deleteStockForm} />
