<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{data.client.name}</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-6" />
</Card.Root>
