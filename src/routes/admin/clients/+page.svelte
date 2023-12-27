<script lang="ts">
	import type { PageData } from './$types';
	import ClientFormDialog from '$lib/components/ClientFormDialog.svelte';

	export let data: PageData;
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Clients</h2>
		<div class="flex items-center space-x-2">
			{#if data.roles.includes('Admin')}
				<ClientFormDialog form={data.form} />
			{/if}
		</div>
	</div>
</div>
