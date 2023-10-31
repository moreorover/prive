<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1>Admin</h1>

<h2>Available roles: {JSON.stringify(data.availableRoles)}</h2>
<h2>User roles: {data.userRoles}</h2>
