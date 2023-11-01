<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<Button href="/admin">Admin Page</Button>
<form action="/logout" method="POST">
	<Button type="submit">Sign out</Button>
</form>
