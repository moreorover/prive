<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Navigation
	class="mx-6"
	authenticated={true}
	fullName={data.session.user.user_metadata.full_name}
	email={data.session.user.email}
	roles={data.roles}
/>

<slot />
