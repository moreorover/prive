<script lang="ts">
	import type { PageData } from './$types';
	import ClientForm from '$lib/components/ClientForm.svelte';
	export let data: PageData;
</script>

<h1>New Client</h1>
<ClientForm form={data.form} />
