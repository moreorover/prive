<script lang="ts">
	import { cn } from '$lib/utils';
	import UserNavigation from '$lib/components/UserNavigation.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { User } from '@supabase/gotrue-js/src/lib/types';
	import { version } from '$app/environment';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let authenticated: boolean = false;
	export let user: User | undefined;
	export let roles: string[];

	const routes = [{ name: 'Courses', href: '/courses' }];
</script>

<div class="border-b">
	<div class="flex h-16 items-center justify-between px-4">
		<!--		<div class="ml-auto flex items-center space-x-4" />-->
		<div class="flex items-center justify-between gap-2">
			<a href="/" class="href">
				<h1 class="text-3xl font-bold tracking-tight">Prive</h1>
			</a>
			<span class="self-end text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">v{version}</span>
		</div>
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
				<UserNavigation
					fullName={user?.user_metadata.full_name}
					email={user?.email ? user?.email : 'undefined'}
				/>
			{:else}
				<Button href="/login">Login</Button>
				<Button href="/register">Register</Button>
			{/if}
		</nav>
	</div>
</div>
