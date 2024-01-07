<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';

	export let data;
</script>

<Navigation
	class="mx-6"
	authenticated={!!data.session}
	user={data.session ? data.session.user : undefined}
	roles={data.roles}
/>

<slot />
