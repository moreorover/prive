<script lang="ts">
	import { enhance } from "$app/forms";

	// import { superForm } from "sveltekit-superforms/client";

	export let permissionGroup; // data needs a role passed in as well
	export let role;

	// const { form, errors, enhance } = superForm(data, {
	// 	resetForm: true,
	// 	onResult: ({ result }) => {
	// 		if (result.type === "success") {
	// 			return;
	// 		}
	// 	}
	// });
</script>

<form method="POST" action="?/updateRolePermissions" use:enhance>
	<div class="mb-2 space-x-2">
		<p class="font-semibold">{permissionGroup.title}:</p>
	</div>
	<div class="ml-8 flex items-center justify-between">
		<div>
			{#each permissionGroup.permissions as permission}
				<label class="mr-6 inline-flex items-center">
					<input type="checkbox" class="checkbox text-blue-500" checked={permission.state} />
					<span class="ml-2">{permission.title}</span>
				</label>
			{/each}
		</div>
		<a class="variant-filled variant-filled-tertiary btn btn-sm">Save</a>
	</div>
</form>
