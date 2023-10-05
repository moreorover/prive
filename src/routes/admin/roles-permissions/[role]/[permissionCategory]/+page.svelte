<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";

	export let data: PageData;
	// const { form, errors, enhance } = superForm(data.form, RolePermisssionsSchema);

	// Client API:
	const { form, errors, enhance } = superForm(data.form, { dataType: "json" });
</script>

<form method="POST" action="?/updateRolePermissions" use:enhance>
	<div class="mb-2 space-x-2">
		<p class="font-semibold">{$form.role}:</p>
	</div>
	<div class="ml-8 flex items-center justify-between">
		<div>
			{#each $form.rolePermissions as _, i}
				<label class="mr-6 inline-flex items-center">
					<input
						type="checkbox"
						class="checkbox text-blue-500"
						bind:checked={$form.rolePermissions[i].status} />
					<span class="ml-2">{$form.rolePermissions[i].permission}</span>
				</label>
			{/each}
		</div>
		<button type="submit" class="variant-filled variant-filled-tertiary btn btn-sm">Save</button>
	</div>
</form>
