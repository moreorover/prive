<script lang="ts">
	import type { PageData } from './$types';
	import ClientFormDialog from '$lib/components/ClientFormDialog.svelte';

	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;

	function getAvatarFallBack(name: string): string {
		let initials = name
			.split(' ')
			.map((word) => word[0])
			.join('');
		return initials.toUpperCase();
	}
</script>

<Card.Root>
	<Card.Header>
		<div class="flex items-center justify-between space-y-2">
			<div>
				<Card.Title>Clients</Card.Title>
				<Card.Description>List of Clients</Card.Description>
			</div>
			<div class="flex items-center space-x-2">
				{#if data.roles.includes('Admin')}
					<ClientFormDialog form={data.createClientForm} />
				{/if}
			</div>
		</div>
	</Card.Header>
	<Card.Content class="grid gap-6">
		{#each data.clients as client}
			<div class="flex items-center justify-between space-x-4">
				<div class="flex items-center space-x-4">
					<Avatar.Root>
						<!--						<Avatar.Image src="" alt="Sofia Davis" />-->
						<Avatar.Fallback>{getAvatarFallBack(client.name)}</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<p class="text-sm font-medium leading-none">{client.name}</p>
						{#if client.email}
							<p class="text-sm text-muted-foreground">{client.email}</p>
						{/if}
						{#if client.instagram}
							<p class="text-sm text-muted-foreground">{client.instagram}</p>
						{/if}
						{#if client.phone}
							<p class="text-sm text-muted-foreground">{client.phone}</p>
						{/if}
					</div>
				</div>
				<Button variant="secondary" href={`/admin/clients/${client.id}`}>View</Button>
			</div>
		{/each}
	</Card.Content>
</Card.Root>
