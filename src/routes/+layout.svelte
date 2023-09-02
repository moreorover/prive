<script lang="ts">
	import Navigation from "$lib/components/Navigation.svelte";
	import ProfileDrawer from "$lib/components/ProfileDrawer.svelte";
	import { Drawer, Modal, Toast, getDrawerStore, initializeStores } from "@skeletonlabs/skeleton";
	import "../app.postcss";
	initializeStores();
	const drawerStore = getDrawerStore();
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

<slot />
