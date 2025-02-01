<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Eye, EyeClosed } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();

	let showP = $state(false);
	let showCP = $state(false);
</script>

{#if form?.success}
	<h2 class="mb-3 text-center text-2xl">Success in Making User</h2>
	<Button class="w-full rounded" href="/admin/users">View Users</Button>
{:else}
	<h2 class="text-center text-2xl">New User</h2>
	<form action="?/registerUser" method="POST" class="">
		<Label for="first_name">First Name</Label>
		<Input id="first_name" name="first_name" required />

		<Label for="last_name">Last Name</Label>
		<Input id="last_name" name="last_name" required />

		<Label for="phone_number">Phone Number (+266)</Label>
		<Input id="phone_number" name="phone_number" required minlength={7} maxlength={9} />

		<Label for="password">Password</Label>
		<div class="flex gap-3">
			<Input
				id="password"
				name="password"
				type={showP ? 'text' : 'password'}
				minlength={4}
				required
			/>
			<Button
				size="icon"
				variant="outline"
				class="rounded"
				onclick={() => {
					showP = !showP;
				}}
			>
				{#if showP}
					<Eye />
				{:else}
					<EyeClosed />
				{/if}
			</Button>
		</div>

		<Label for="cpassword">Confirm Password</Label>
		<div class="flex gap-3">
			<Input
				id="cpassword"
				name="cpassword"
				type={showCP ? 'text' : 'password'}
				minlength={4}
				required
			/>
			<Button
				size="icon"
				variant="outline"
				class="rounded"
				onclick={() => {
					showCP = !showCP;
				}}
			>
				{#if showCP}
					<Eye />
				{:else}
					<EyeClosed />
				{/if}
			</Button>
		</div>

		{#if form?.error}
			<p class="text-destructive">{form.error}</p>
		{/if}

		<Button class="mt-3 w-full rounded" type="submit">Submit</Button>
	</form>
{/if}
