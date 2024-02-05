<script lang="ts">
	import ClientUpdateFormDialog from '$lib/components/ClientUpdateFormDialog.svelte';
	import * as Card from '$lib/components/ui/card';
	import { ArrowDown, AtSign, Instagram, Phone } from 'lucide-svelte';

	export let data;
</script>

<Card.Root>
	<Card.Header>
		<div class="flex items-center justify-between">
			<div>
				<Card.Title>{data.client.name}</Card.Title>
			</div>
			<div>
				<ClientUpdateFormDialog data={data.updateClientForm} />
			</div>
		</div>
		{#if data.client.email}
			<div class="flex justify-start space-x-2">
				<AtSign />
				<div>{data.client.email}</div>
			</div>
		{/if}
		{#if data.client.phone}
			<div class="flex justify-start space-x-2">
				<Phone />
				<div>{data.client.phone}</div>
			</div>
		{/if}
		{#if data.client.instagram}
			<div class="flex justify-start space-x-2">
				<Instagram />
				<div>{data.client.instagram}</div>
			</div>
		{/if}
		{#if data.client?.abbreviation}
			<div class="flex justify-start space-x-2">
				<ArrowDown />
				<div>{data.client.abbreviation}</div>
			</div>
		{/if}
	</Card.Header>
	<Card.Content />
</Card.Root>

<Card.Root class="mt-4">
	<Card.Header>
		<div class="flex items-center justify-between">
			<div>
				<Card.Title>Orders</Card.Title>
			</div>
			<div>
				<ClientUpdateFormDialog data={data.updateClientForm} />
				<ClientUpdateFormDialog data={data.updateClientForm} />
			</div>
		</div>
	</Card.Header>
	<Card.Content />
</Card.Root>
