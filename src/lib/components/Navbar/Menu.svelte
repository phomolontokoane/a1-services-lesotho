<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Menu } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { page } from '$app/state';
	import { user } from '$lib/stores/user';

	let open = $state(false);
	let User = $state<{
		id: number;
		name: string;
		phone_number: string;
	}>();

	user.subscribe((u) => {
		if (u.id != -1) {
			User = u;
		}
	});
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger class={`lg:hidden ${page.url.pathname.includes('admin') ? 'hidden' : ''}`}>
		<Menu />
	</Sheet.Trigger>
	<Sheet.Content side="left">
		<Sheet.Header>
			<Sheet.Title>Navigation</Sheet.Title>
		</Sheet.Header>

		<div class="flex flex-col gap-2">
			<a
				href="/"
				onclick={() => {
					open = false;
				}}>Home</a
			>
			<hr class="my-2" />
			{#if User && User.id != -1}
				<a
					href="/account"
					onclick={() => {
						open = false;
					}}>Account</a
				>
				<hr class="my-2" />

				<Button
					href="/login?logout=true"
					onclick={() => {
						open = false;
					}}>Log Out</Button
				>
			{:else}
				<div class="flex gap-3">
					<Button
						class="grow"
						href="/signin"
						onclick={() => {
							open = false;
						}}>Sign Up</Button
					>
					<Button
						class="grow"
						href="/login"
						onclick={() => {
							open = false;
						}}>Login</Button
					>
				</div>
			{/if}
		</div>
	</Sheet.Content>
</Sheet.Root>
