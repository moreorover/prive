<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import SideBarNavigation from '$lib/components/SideBarNavigation.svelte';
	export let data;

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
		},
		{
			title: 'Hair',
			href: '/admin/hair'
		},
		{
			title: 'Hair Orders',
			href: '/admin/hair_orders'
		},
		{
			title: 'Products',
			href: '/admin/products'
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
