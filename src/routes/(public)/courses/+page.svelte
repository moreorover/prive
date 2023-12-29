<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Plus } from 'lucide-svelte';

	export let data: PageData;

	const courses = [
		{ title: 'Course 1', description: 'Course 1 description', published: true },
		{ title: 'Course 2', description: 'Course 2 description', published: false }
	];
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold tracking-tight">Courses</h2>
		<div class="flex items-center space-x-2">
			{#if data.roles.includes('Admin')}
				<Button size="sm" href="#">
					<Plus class="mr-2 h-4 w-4" />
					Create
				</Button>
			{/if}
		</div>
	</div>
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
		{#each courses as course}
			{#if data.roles.includes('Admin')}
				<Card.Root class="col-span-4">
					<Card.Header>
						<Card.Title>{course.title}</Card.Title>
					</Card.Header>
					<Card.Content>{course.description}</Card.Content>
				</Card.Root>
			{:else if course.published}
				<Card.Root class="col-span-4">
					<Card.Header>
						<Card.Title>{course.title}</Card.Title>
					</Card.Header>
					<Card.Content>{course.description}</Card.Content>
				</Card.Root>
			{/if}
		{/each}
	</div>
</div>
