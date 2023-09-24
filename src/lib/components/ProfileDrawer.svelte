<script lang="ts">
	import { getDrawerStore } from "@skeletonlabs/skeleton";

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={drawerClose}>Home</a></li>
		<li><a href="/admin" on:click={drawerClose}>Admin</a></li>
		<li><a href="/?test=2" on:click={drawerClose}>Other Page 2</a></li>
	</ul>
	<hr />
	<ul>
		<li>
			<form action="/logout" method="POST">
				<button type="submit">Sign out</button>
			</form>
		</li>
	</ul>
</nav>
