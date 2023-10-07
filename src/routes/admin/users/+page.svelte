<script lang="ts">
	import { createSearchStore, searchHandler } from "$lib/stores/search";
	import { onDestroy } from "svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	type User = {
		id: string;
		email: string;
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
	<div class="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3">
		{#each $searchStore.filtered as user}
			<a class="card card-hover m-2 p-2 shadow-lg" href="/admin/users/{user.id}">
				<div class="text-center">
					<span class="block text-lg font-semibold">{user.full_name}</span>
					<div class="mt-2 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1"
							stroke="currentColor"
							class="h-6 w-6 text-gray-600">
							<path
								stroke-linecap="round"
								d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
						</svg>
						<span class="ml-2 text-gray-600">{user.email}</span>
					</div>
					<div class="mt-2 flex">
						{#if user.user_roles.length != 0}
							{#each user.user_roles as role}
								<span class="variant-filled chip mr-2">{role.role}</span>
							{/each}
						{/if}
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
