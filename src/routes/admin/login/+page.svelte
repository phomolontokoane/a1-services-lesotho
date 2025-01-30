<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index';
	import type { PageData, ActionData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { form }: Props = $props();
	let loggin_url = $state('/');
	if (form?.is_super) {
		loggin_url = '/admin';
	} else if (form?.owner) {
		loggin_url = `/admin/${form.owner}`;
	}
</script>

<h1>Login Page</h1>

{#if form?.success}
	<section class="space-y-6">
		<h1 class="text-center text-5xl font-semibold">Logged In</h1>
		<Button href={loggin_url} class="mx-auto w-full rounded text-xl"
			>{form.is_super ? 'Go to Stores' : 'View your Store'}</Button
		>
	</section>
{:else}
	<form method="POST" action="?/login_admin">
		<Label for="email">Email</Label>
		<Input id="email" name="email" type="email" required />

		<Label for="password">Password</Label>
		<Input id="password" name="password" type="password" required />

		<Button type="submit" class="my-4 w-full">Login Admin</Button>
	</form>
{/if}

{#if form?.error}
	<p>{form.error}</p>
{/if}
