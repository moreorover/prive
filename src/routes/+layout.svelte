<script lang="ts">
	import Navigation from "$lib/components/Navigation.svelte";
	import ProfileDrawer from "$lib/components/ProfileDrawer.svelte";
	import {
		AppBar,
		AppShell,
		Avatar,
		Drawer,
		Modal,
		Toast,
		getDrawerStore,
		initializeStores
	} from "@skeletonlabs/skeleton";
	import "../app.postcss";

	initializeStores();

	const drawerStore = getDrawerStore();

	function navigationDrawerOpen(): void {
		drawerStore.open({
			id: "navigation",
			position: "left"
		});
	}

	function profileDrawerOpen(): void {
		drawerStore.open({
			id: "profile",
			position: "right"
		});
	}
</script>

<Drawer>
	<h2 class="p-4">Prive</h2>
	<hr />
	{#if $drawerStore.id === "navigation"}
		<Navigation />
	{:else if $drawerStore.id === "profile"}
		<ProfileDrawer />
	{/if}
</Drawer>

<Toast position="br" />

<Modal />

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={navigationDrawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<a href="/">
						<strong class="text-xl uppercase">Prive</strong>
					</a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-ghost-primary" href="/login"> Login </a>
				<a class="btn btn-sm variant-ghost-secondary" href="/register"> Register </a>
				<Avatar
					border="border-4 border-surface-300-600-token hover:!border-primary-500"
					cursor="cursor-pointer"
					on:click={profileDrawerOpen} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
</AppShell>
