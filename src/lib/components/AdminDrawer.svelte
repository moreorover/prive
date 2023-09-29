<script lang="ts">
	import { getDrawerStore } from "@skeletonlabs/skeleton";

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	const pages = [
		{
			title: "Admin",
			href: "/admin"
		},
		{
			title: "Users",
			href: "/admin/users"
		}
	];
</script>

<nav class="list-nav p-4">
	<ul>
		{#each pages as page}
			<li><a href={page.href} on:click={drawerClose}>{page.title}</a></li>
		{/each}
	</ul>
</nav>
