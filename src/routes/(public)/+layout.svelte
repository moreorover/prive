<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Navigation
	class="mx-6"
	authenticated={!!data.session}
	user={data.session ? data.session.user : undefined}
	roles={data.roles}
/>

<slot />
