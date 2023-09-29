<script lang="ts">
	import { createSearchStore, searchHandler } from "$lib/stores/search";
	import { onDestroy } from "svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	type User = {
		id: string;
		full_name: string;
		searchTerms: string;
	};

	const searchAllUsers: User[] = data.allUsers.map((user: User) => ({
		...user,
		searchTerms: `${user.full_name}`
	}));

	const searchStore = createSearchStore(searchAllUsers);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="m-4">
	<h1>USERS</h1>

	<label class="label">
		<span>Search Users</span>
		<input class="input" type="search" placeholder="Search..." bind:value={$searchStore.search} />
	</label>
	<!-- <div class="flex flex-wrap justify-center" /> -->
	<div class="-mx-1 flex flex-wrap lg:-mx-4">
		{#each $searchStore.filtered as user}
			<a class="card card-hover m-4 block p-4" href="/admin/users/{user.id}">{user.full_name}</a>
		{/each}
	</div>
</div>
