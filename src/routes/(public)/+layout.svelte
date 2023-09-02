<script lang="ts">
	import { AppBar, AppShell, Avatar, getDrawerStore } from "@skeletonlabs/skeleton";

	const drawerStore = getDrawerStore();

	function profileDrawerOpen(): void {
		drawerStore.open({
			id: "profile",
			position: "right"
		});
	}
</script>

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
				<a class="btn btn-sm variant-ghost-primary" href="/login"> Login </a>
				<a class="btn btn-sm variant-ghost-secondary" href="/register"> Register </a>
				<Avatar
					border="border-4 border-surface-300-600-token hover:!border-primary-500"
					cursor="cursor-pointer"
					on:click={profileDrawerOpen} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
