<script lang="ts">
	import {
		AppBar,
		AppShell,
		autoModeWatcher,
		Avatar,
		getDrawerStore,
		LightSwitch
	} from "@skeletonlabs/skeleton";

	const drawerStore = getDrawerStore();

	function profileDrawerOpen(): void {
		drawerStore.open({
			id: "profile",
			position: "right"
		});
	}
</script>

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl uppercase">Prive</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="variant-ghost-primary btn btn-sm" href="/login"> Login </a>
				<a class="variant-ghost-secondary btn btn-sm" href="/register"> Register </a>
				<Avatar
					border="border-4 border-surface-300-600-token hover:!border-primary-500"
					cursor="cursor-pointer"
					on:click={profileDrawerOpen} />
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
