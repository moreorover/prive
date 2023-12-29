<script>
	import '../app.postcss';
	import { beforeNavigate } from '$app/navigation';
	import { updated } from '$app/stores';

	// https://kit.svelte.dev/docs/configuration#version
	beforeNavigate(({ willUnload, to }) => {
		if ($updated && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
</script>

<slot />
