<script lang="ts">
	import { page } from "$app/stores";
	import { getDrawerStore } from "@skeletonlabs/skeleton";

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	const pages = [
		{ title: "Admin", href: "/admin" },
		{ title: "Role Permissions", href: "/admin/roles-permissions" },
		{ title: "Users", href: "/admin/users" }
	];
</script>

<nav class="list-nav p-4">
	<ul>
		{#each pages as p}
			<!-- <AppRailAnchor href={p.href} selected={$page.url.pathname === {p.href}}>{p.title}</AppRailAnchor> -->
			<li>
				<a
					href={p.href}
					on:click={drawerClose}
					class:!bg-primary-400={$page.url.pathname === p.href}>{p.title}</a>
			</li>
		{/each}
	</ul>
</nav>
