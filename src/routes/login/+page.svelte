<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageData, ActionData } from './$types.js';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { form }: Props = $props();

	let log_page = $state('/');
	if (form?.back_store) {
		log_page = `/${form.back_store}/cart`;
	}
</script>

{#if form?.success}
	<section class="space-y-3">
		<h1 class="text-center text-3xl font-semibold">You are logged in</h1>
		<Button href={log_page} class="mx-auto"
			>{log_page == '/' ? 'Go to Home page' : 'Continue Shopping'}</Button
		>
	</section>
{:else}
	<form method="POST" action="?/login">
		<Label for="phone_number">Phone Number(+266)</Label>
		<Input id="phone_number" name="phone_number" />
		<Label for="password">Password</Label>
		<Input id="password" name="password" type="password" />

		<Button class="mt-6 w-full" type="submit">Login</Button>
	</form>
{/if}

{#if form?.error}
	<div>{form.error}</div>
{/if}
