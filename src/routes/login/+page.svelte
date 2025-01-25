<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types.js';
	import { toast } from 'svelte-sonner';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();
	
	onMount(() => {
		if (browser) {
			if (form?.success) {
				toast.success("You are logged in " + (data.user?.name ?? ""))
				goto('/');
			}
		}
	});
</script>

<form method="POST" action="?/login">
	<Label for="phone_number">Phone Number(+266)</Label>
	<Input id="phone_number" name="phone_number" />
	<Label for="password">Password</Label>
	<Input id="password" name="password" type="password" />

	<Button class="mt-6 w-full" type="submit">Login</Button>
</form>

{#if form?.error}
	<div>{form.error}</div>
{/if}
