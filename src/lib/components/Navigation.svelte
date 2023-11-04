<script lang="ts">
	import { cn } from '$lib/utils';
	import UserNavigation from '$lib/components/UserNavigation.svelte';
	import { Button } from '$lib/components/ui/button';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let authenticated: boolean = false;
	export let fullName: string;
	export let email: string;
	export let roles: string[];

	const routes = [{ name: 'Courses', href: '/courses' }];
</script>

<div class="border-b">
	<div class="flex h-16 items-center justify-between px-4">
		<!--		<div class="ml-auto flex items-center space-x-4" />-->
		<a href="/" class="href">
			<h2 class="text-3xl font-bold tracking-tight">Prive</h2>
		</a>
		<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
			{#each routes as route}
				<a href={route.href} class="text-sm font-medium transition-colors hover:text-primary">
					{route.name}
				</a>
			{/each}
			{#if roles.includes('Admin')}
				<a href="/admin" class="text-sm font-medium transition-colors hover:text-primary">
					Admin
				</a>
			{/if}
			{#if authenticated}
				<UserNavigation {fullName} {email} />
			{:else}
				<Button href="/login">Login</Button>
				<Button href="/register">Register</Button>
			{/if}
		</nav>
	</div>
</div>
