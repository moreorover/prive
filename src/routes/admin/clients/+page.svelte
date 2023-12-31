<script lang="ts">
	import type { PageData } from './$types';
	import ClientCreateFormDialog from '$lib/components/ClientCreateFormDialog.svelte';

	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';

	export let data: PageData;

	type Client = {
		id: string;
		name: string;
		email: string | null;
		phone: string | null;
		instagram: string | null;
	};

	const searchClients: Client[] = data.clients.map((client: Client) => ({
		...client,
		searchTerms: `${client.name} ${client.email} ${client.phone} ${client.instagram}`
	}));

	const searchStore = createSearchStore(searchClients);

	$: {
		$searchStore.data = data.clients.map((client: Client) => ({
			...client,
			searchTerms: `${client.name} ${client.email} ${client.phone} ${client.instagram}`
		}));
	}

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});

	function getAvatarFallBack(name: string): string {
		let initials = name
			.split(' ')
			.map((word) => word[0])
			.join('');
		return initials.toUpperCase();
	}
</script>

<Card.Root>
	<Card.Header data-testid="clients-header">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<Card.Title data-testid="clients-title">Clients</Card.Title>
				<Card.Description>List of Clients</Card.Description>
			</div>
			<div class="flex items-center space-x-2">
				<Input
					type="search"
					placeholder="Search"
					class="max-w-xs"
					bind:value={$searchStore.search}
				/>
				{#if data.roles.includes('Admin')}
					<ClientCreateFormDialog form={data.createClientForm} />
				{/if}
			</div>
		</div>
	</Card.Header>
	<Card.Content class="grid gap-6" data-testid="client-rows">
		{#each $searchStore.filtered as client}
			<div class="flex items-center justify-between space-x-4" data-testid="client-row-{client.id}">
				<div class="flex items-center space-x-4">
					<Avatar.Root>
						<!--						<Avatar.Image src="" alt="Sofia Davis" />-->
						<Avatar.Fallback>{getAvatarFallBack(client.name)}</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<p
							class="text-sm font-medium leading-none"
							data-testid="client-name-{client.name.replace(' ', '-')}"
						>
							{client.name}
						</p>
						{#if client.email}
							<p
								class="text-sm text-muted-foreground"
								data-testid="client-email-{client.email.replace(' ', '-')}"
							>
								{client.email}
							</p>
						{/if}
						{#if client.instagram}
							<p
								class="text-sm text-muted-foreground"
								data-testid="client-instagram-{client.instagram.replace(' ', '-')}"
							>
								{client.instagram}
							</p>
						{/if}
						{#if client.phone}
							<p
								class="text-sm text-muted-foreground"
								data-testid="client-phone-{client.phone.replace(' ', '-')}"
							>
								{client.phone}
							</p>
						{/if}
					</div>
				</div>
				<Button
					variant="secondary"
					href={`/admin/clients/${client.id}`}
					data-testid="client-view-{client.id}">View</Button
				>
			</div>
		{/each}
	</Card.Content>
</Card.Root>
