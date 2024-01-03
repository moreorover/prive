<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import SelectClientDialog from '$lib/components/SelectClientDialog.svelte';
	import { utcToReadableDate } from '$lib/utils';
	import SetOrderStatusDialog from '$lib/components/SetOrderStatusDialog.svelte';

	export let data: PageData;
</script>

<div class="grid lg:grid-cols-2">
	<Card.Root>
		<Card.Header>
			<Card.Title>Order: {data.order.title}</Card.Title>
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
		</Card.Content>
		<!--	<Card.Footer>-->
		<!--		<Button variant="outline" class="w-full">Save preferences</Button>-->
		<!--	</Card.Footer>-->
	</Card.Root>
</div>
