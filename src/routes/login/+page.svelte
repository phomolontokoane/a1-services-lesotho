<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types.js';
	
	let { data, form } = $props();
	if (form?.success) {
		redirect(303, "/")
	}
</script>

<form method="POST" action="?/login">
	<Label for="phone_number">Phone Number(+266)</Label>
	<Input  id="phone_number" name="phone_number"/>
	<Label for="password">Password</Label>
	<Input  id="password" name="password" type="password"/>

	<Button class="mt-6 w-full" type="submit">Login</Button>
</form>

{#if form?.error}
	<div>{form.error}</div>
{/if}