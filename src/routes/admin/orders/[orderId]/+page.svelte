<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import SelectClientDialog from '$lib/components/SelectClientDialog.svelte';

	export let data: PageData;
</script>

<div class="flex flex-col grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	<Card.Root>
		<Card.Header>
			<div class="flex items-center justify-between space-y-2">
				<div>
					<Card.Title>{data.order.title}</Card.Title>
				</div>
				<div>
					<!--				<ClientUpdateFormDialog data={data.updateClientForm} />-->
				</div>
			</div>
		</Card.Header>
		<Card.Content class="grid gap-6" />
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<div class="flex items-center justify-between space-y-2">
				<div>
					<Card.Title>Completed</Card.Title>
				</div>
				<div>
					<!--				<ClientUpdateFormDialog data={data.updateClientForm} />-->
				</div>
			</div>
		</Card.Header>
		<Card.Content class="grid gap-6" />
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<div class="flex items-center justify-between space-y-2">
				<div>
					<Card.Title>Client</Card.Title>
				</div>
				<div>
					<!--				<ClientUpdateFormDialog data={data.updateClientForm} />-->
					<SelectClientDialog form={data.selectClientForm} clients={data.clients} />
					{data.order?.clients?.name}
				</div>
			</div>
		</Card.Header>
		<Card.Content class="grid gap-6" />
	</Card.Root>
</div>
