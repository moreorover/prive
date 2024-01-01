<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import type { PageData } from './$types';
	import SideBarNavigation from '$lib/components/SideBarNavigation.svelte';
	export let data: PageData;

	const sidebarNavItems = [
		{
			title: 'Admin',
			href: '/admin'
		},
		{
			title: 'Clients',
			href: '/admin/clients'
		},
		{
			title: 'Orders',
			href: '/admin/orders'
		}
	];
</script>

<Navigation class="mx-6" authenticated={true} user={data.session.user} roles={data.roles} />

<div class="space-y-6 p-10 pb-16 md:block">
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/6">
			<SideBarNavigation items={sidebarNavItems} />
		</aside>
		<div class="flex-1 w-full">
			<slot />
		</div>
	</div>
</div>
