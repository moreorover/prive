<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Navigation class="mx-6" authenticated={true} user={data.session.user} roles={data.roles} />

<slot />
