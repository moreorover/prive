<script lang="ts">
	import { invalidate } from "$app/navigation";
	import Navigation from "$lib/components/AdminDrawer.svelte";
	import ProfileDrawer from "$lib/components/ProfileDrawer.svelte";
	import {
		AppBar,
		AppShell,
		Avatar,
		Drawer,
		LightSwitch,
		Modal,
		Toast,
		autoModeWatcher,
		getDrawerStore,
		initializeStores
	} from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	import "../app.postcss";
	import type { LayoutData } from "./$types";
	initializeStores();
	const drawerStore = getDrawerStore();

	import { page } from "$app/stores";

	export let data: LayoutData;

	let showNavigation: boolean = false;

	$: if ($page.url.pathname.startsWith("/admin")) {
		showNavigation = true;
	} else {
		showNavigation = false;
	}

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

	$: ({ session, supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});

	$: classesSidebar = $page.url.pathname.startsWith("/admin")
		? "bg-surface-500/5 w-0 lg:w-64"
		: "w-0";
</script>

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>

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

<AppShell slotSidebarLeft={classesSidebar}>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-sm mr-4 lg:hidden" on:click={navigationDrawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token h-4 w-4">
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
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	{$page.url.pathname}
	<slot />
</AppShell>
