<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import ClientUpdateFormDialog from '$lib/components/ClientUpdateFormDialog.svelte';

	export let data;
</script>

<Card.Root>
	<Card.Header>
		<div class="flex items-center justify-between space-y-2">
			<div>
				<Card.Title>{data.client.name}</Card.Title>
			</div>
			<div>
				<ClientUpdateFormDialog data={data.updateClientForm} />
			</div>
		</div>
	</Card.Header>
	<Card.Content class="grid gap-6" />
</Card.Root>
