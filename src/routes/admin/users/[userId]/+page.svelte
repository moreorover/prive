<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="card p-4">
	<h1>{data.user.full_name}</h1>
</div>

<div class="card mt-4 p-4">
	{#each data.user.user_roles as role}
		<h1>{role.role}</h1>
	{/each}
	<a href="/admin/users/{data.user.id}/updateRoles" class="variant-filled-surface btn btn-sm"
		>Update Roles</a>
</div>
