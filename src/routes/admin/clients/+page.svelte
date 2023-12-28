<script lang="ts">
	import type { PageData } from './$types';
	import ClientFormDialog from '$lib/components/ClientFormDialog.svelte';

	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';

	export let data: PageData;
</script>

<Card.Root>
	<Card.Header>
		<div class="flex items-center justify-between space-y-2">
			<div>
				<Card.Title>Clients</Card.Title>
				<Card.Description>List of Clients</Card.Description>
			</div>
			<div class="flex items-center space-x-2">
				{#if data.roles.includes('Admin')}
					<ClientFormDialog form={data.createClientForm} />
				{/if}
			</div>
		</div>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="flex items-center justify-between space-x-4">
			<div class="flex items-center space-x-4">
				<Avatar.Root>
					<Avatar.Image src="" alt="Sofia Davis" />
					<Avatar.Fallback>SD</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<p class="text-sm font-medium leading-none">Sofia Davis</p>
					<p class="text-sm text-muted-foreground">m@example.com</p>
				</div>
			</div>
			<Popover.Root>
				<Popover.Trigger asChild let:builder>
					<Button builders={[builder]} variant="outline" class="ml-auto">Owner</Button>
				</Popover.Trigger>
				<Popover.Content class="p-0" align="end">
					<Command.Root>
						<Command.Input placeholder="Select new role..." />
						<Command.List>
							<Command.Empty>No roles found.</Command.Empty>
							<Command.Group>
								<Command.Item class="space-y-1 flex flex-col items-start px-4 py-2">
									<p>Viewer</p>
									<p class="text-sm text-muted-foreground">Can view and comment.</p>
								</Command.Item>
								<Command.Item class="space-y-1 flex flex-col items-start px-4 py-2">
									<p>Developer</p>
									<p class="text-sm text-muted-foreground">Can view, comment, and edit.</p>
								</Command.Item>
								<Command.Item class="space-y-1 flex flex-col items-start px-4 py-2">
									<p>Billing</p>
									<p class="text-sm text-muted-foreground">Can view, comment and manage billing.</p>
								</Command.Item>
								<Command.Item class="space-y-1 flex flex-col items-start px-4 py-2">
									<p>Owner</p>
									<p class="text-sm text-muted-foreground">Admin-level access to all resources.</p>
								</Command.Item>
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</div>
		<div class="flex items-center justify-between space-x-4">
			<div class="flex items-center space-x-4">
				<Avatar.Root>
					<Avatar.Image src="" alt="Jackson Lee" />
					<Avatar.Fallback>JL</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<p class="text-sm font-medium leading-none">Jackson Lee</p>
					<p class="text-sm text-muted-foreground">p@example.com</p>
				</div>
			</div>
			<Popover.Root>
				<Popover.Trigger asChild let:builder>
					<Button builders={[builder]} variant="outline" class="ml-auto">Member</Button>
				</Popover.Trigger>
				<Popover.Content class="p-0" align="end">
					<Command.Root>
						<Command.Input placeholder="Select new role..." />
						<Command.List>
							<Command.Empty>No roles found.</Command.Empty>
							<Command.Group>
								<Command.Item class="space-y-1 flex flex-col items-start px-4 py-2">
									<p>Viewer</p>
									<p class="text-sm text-muted-foreground">Can view and comment.</p>
								</Command.Item>
								<Command.Item class="space-y-1 flex flex-col items-start px-4 py-2">
									<p>Developer</p>
									<p class="text-sm text-muted-foreground">Can view, comment, and edit.</p>
								</Command.Item>
								<Command.Item class="space-y-1 flex flex-col items-start px-4 py-2">
									<p>Billing</p>
									<p class="text-sm text-muted-foreground">Can view, comment and manage billing.</p>
								</Command.Item>
								<Command.Item class="space-y-1 flex flex-col items-start px-4 py-2">
									<p>Owner</p>
									<p class="text-sm text-muted-foreground">Admin-level access to all resources.</p>
								</Command.Item>
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</div>
	</Card.Content>
</Card.Root>
<!--</div>-->
