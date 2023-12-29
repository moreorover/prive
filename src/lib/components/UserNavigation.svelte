<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';

	export let fullName: string;
	export let email: string;
</script>

<DropdownMenu.Root positioning={{ placement: 'bottom-end' }}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			class="relative h-8 w-8 rounded-full"
			data-testid="user-dropdown"
		>
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src="/user.png" alt="@shadcn" data-testid="user-image" />
				<Avatar.Fallback>{fullName.split(' ')[0][0] + fullName.split(' ')[1][0]}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{fullName}</p>
				<p class="text-xs leading-none text-muted-foreground">{email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				Profile
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				Billing
				<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				Settings
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>New Team</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<form action="/logout" method="POST">
				<Button type="submit" data-testid="logout-button">Log out</Button>
			</form>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
