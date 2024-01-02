<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import {
		selectClientSchema,
		type Client,
		type SelectClientSchema
	} from '$lib/schema/orderSchema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { FormOptions } from 'formsnap';
	import { buttonVariants } from '$lib/components/ui/button';
	import { tick } from 'svelte';
	import { cn } from '$lib/utils';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	export let form: SuperValidated<SelectClientSchema>;
	export let clients: Client[];

	let openDialog: boolean = false;
	let openPopover: boolean = false;

	const options: FormOptions<typeof selectClientSchema> = {
		validators: selectClientSchema,
		resetForm: true,
		onResult: (event) => {
			// console.log(event);
			console.log(event.result.type);
			if (event.result.type == 'failure') {
				console.log('form failed');
			}
			if (event.result.type == 'success') {
				console.log('form success');
				openDialog = false;
			}
		}
	};

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		openPopover = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Dialog.Root bind:open={openDialog}>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<Form.Root
			{form}
			schema={selectClientSchema}
			let:config
			{options}
			method="POST"
			action="?/selectClient"
			class="space-y-6"
		>
			<Form.Field {config} name="id" let:setValue let:value>
				<Form.Item class="flex flex-col">
					<Form.Label>Language</Form.Label>
					<Popover.Root bind:open={openPopover} let:ids>
						<Popover.Trigger asChild let:builder>
							<Form.Control id={ids.trigger} let:attrs>
								<Button
									builders={[builder]}
									{...attrs}
									variant="outline"
									role="selectClient"
									type="button"
									class={cn('w-[200px] justify-between', !value && 'text-muted-foreground')}
								>
									{clients.find((f) => f.id === value)?.name ?? 'Select client'}
									<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</Form.Control>
						</Popover.Trigger>
						<Popover.Content class="w-[200px] p-0">
							<Command.Root>
								<Command.Input autofocus placeholder="Search language..." />
								<Command.Empty>No language found.</Command.Empty>
								<Command.Group>
									{#each clients as client}
										<Command.Item
											value={client.id}
											onSelect={() => {
												console.log('on select firing');
												console.log(client);
												console.log(client.id);
												setValue(client.id);
												closeAndFocusTrigger(ids.trigger);
											}}
										>
											<Check
												class={cn('mr-2 h-4 w-4', client.id !== value && 'text-transparent')}
											/>
											{client.name}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
					<Form.Description>This is the client that will be assigned to user.</Form.Description>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Button>Submit</Form.Button>
		</Form.Root>
		<!--		<Dialog.Footer>-->
		<!--			<Button type="submit">Save changes</Button>-->
		<!--		</Dialog.Footer>-->
	</Dialog.Content>
</Dialog.Root>
