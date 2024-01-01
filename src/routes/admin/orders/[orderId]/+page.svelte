<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	// import ClientUpdateFormDialog from '$lib/components/ClientUpdateFormDialog.svelte';

	export let data: PageData;
</script>

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
