<script lang="ts">
	import { page } from "$app/stores";
	import { getDrawerStore } from "@skeletonlabs/skeleton";

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	export let username: string;
</script>

<nav class="list-nav p-4">
	<div class="mb-2 border-b pb-2 text-lg font-semibold">
		{username}
	</div>
	<ul class="space-y-2">
		<li>
			<a
				href="/"
				class="rounded p-2 hover:underline"
				on:click={drawerClose}
				class:!bg-primary-400={$page.url.pathname === "/"}>Home</a>
			<a
				href="/admin"
				class="rounded p-2 hover:underline"
				on:click={drawerClose}
				class:!bg-primary-400={$page.url.pathname === "/admin"}>Admin</a>
		</li>
	</ul>
	<hr class="my-2" />
	<ul>
		<li>
			<form action="/logout" method="POST">
				<button type="submit" class="rounded p-2 hover:underline">Sign out</button>
			</form>
		</li>
	</ul>
</nav>
