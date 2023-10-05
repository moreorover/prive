<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="mx-auto max-w-2xl">
	<div class="rounded-lg p-6 shadow-lg">
		<h2 class="mb-4 text-2xl font-bold">View Roles Permissions</h2>

		{#each data.rolePermissionStructure as role}
			<div class="mb-4">
				<h3 class="mb-2 text-xl font-semibold">{role.roleTitle}</h3>

				{#each role.permissionsGroup as permission}
					<div class="mb-2 space-x-2">
						<p class="font-semibold">{permission.title}:</p>
					</div>
					<div class="ml-8 flex items-center justify-between">
						<div>
							{#each permission.permissions as permission}
								<label class="mr-6 inline-flex items-center">
									<input
										type="checkbox"
										class="checkbox text-blue-500"
										checked={permission.state} />
									<span class="ml-2">{permission.title}</span>
								</label>
							{/each}
						</div>
						{#if data.userCanUpdate}
							<a
								href="/admin/roles-permissions/{role.role}/{permission.category}"
								class="variant-filled variant-filled-tertiary btn btn-sm">Update</a>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
