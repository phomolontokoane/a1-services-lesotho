<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageData } from './$types.js';
	
	let { data }: { data: PageData } = $props();
</script>

<form method="POST" action="?/login">
	<Label for="phone_number">Phone Number(+266)</Label>
	<Input  id="phone_number"/>
	<Label for="password">Password</Label>
	<Input  id="password" type="password"/>

	<Button class="mt-6 w-full" type="submit">Login</Button>
</form>