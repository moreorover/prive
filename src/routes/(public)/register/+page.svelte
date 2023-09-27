<script lang="ts">
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";

	export let data: PageData;

	const toastStore = getToastStore();

	function sendToast(message: string) {
		const t: ToastSettings = { message };
		toastStore.trigger(t);
	}

	const { form, errors, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case "success":
					sendToast("Success! Confirm your email to login.");
					break;
				case "error":
					sendToast("Error creating your account!");
					break;
				case "failure":
					sendToast("Check your details and try again!");
					break;
				default:
					return;
			}
			return;
		}
	});
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Register</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" method="POST" use:enhance data-testid="login-form">
			<div>
				<label for="email" class="block text-sm font-medium leading-6">Full Name</label>
				<div class="mt-2">
					<input
						id="full_name"
						name="full_name"
						type="text"
						required
						bind:value={$form.full_name}
						class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						data-testid="full_name" />
					{#if $errors.full_name}
						<span class="block text-red-600 dark:text-red-500">{$errors.full_name}</span>
					{/if}
				</div>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium leading-6">Email</label>
				<div class="mt-2">
					<input
						id="email"
						name="email"
						type="email"
						required
						bind:value={$form.email}
						class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						data-testid="email" />
					{#if $errors.email}
						<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
					{/if}
				</div>
			</div>

			<div>
				<label for="instagram" class="block text-sm font-medium leading-6">Instagram</label>
				<div class="mt-2">
					<input
						id="instagram"
						name="instagram"
						type="text"
						required
						bind:value={$form.instagram}
						class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						data-testid="instagram" />
					{#if $errors.instagram}
						<span class="block text-red-600 dark:text-red-500">{$errors.instagram}</span>
					{/if}
				</div>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium leading-6">Password</label>
				<div class="mt-2">
					<input
						id="password"
						name="password"
						type="password"
						required
						bind:value={$form.password}
						class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						data-testid="password" />
					{#if $errors.password}
						<span class="block text-red-600 dark:text-red-500">{$errors.password}</span>
					{/if}
				</div>
			</div>

			<div>
				<label for="passwordConfirm" class="block text-sm font-medium leading-6"
					>Password Confirm</label>
				<div class="mt-2">
					<input
						id="passwordConfirm"
						name="passwordConfirm"
						type="password"
						required
						bind:value={$form.passwordConfirm}
						class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						data-testid="passwordConfirm" />
					{#if $errors.passwordConfirm}
						<span class="block text-red-600 dark:text-red-500">{$errors.passwordConfirm}</span>
					{/if}
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>Register</button>
			</div>

			<!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Already have an account? <a
					href="/login"
					class="text-blue-700 hover:underline dark:text-blue-500">Sign in</a>
			</div> -->
		</form>

		<p class="mt-10 text-center text-sm text-gray-500">
			Already have an account?
			<a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
				>Login</a>
		</p>
	</div>
</div>
