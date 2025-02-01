<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Menu } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { page } from '$app/state';

	let open = $state(false);
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger
		class={`lg:hidden ${page.url.pathname.includes('store') || page.url.pathname == '/' ? '' : 'hidden'}`}
	>
		<Menu />
	</Sheet.Trigger>
	<Sheet.Content
		side="left"
		onCloseAutoFocus={(e) => {
			// these functions stops some weird behavoir after closing
			e.preventDefault();
		}}
		onOpenAutoFocus={(e) => {
			e.preventDefault();
		}}
	>
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
			<!-- <a
				href="/account"
				onclick={() => {
					open = false;
				}}>Account</a
			> -->
			<!-- <hr class="my-2" />
			 {#if $user}
				<hr class="my-2" />

				<Button
					href="/login?logout=true"
					onclick={() => {
						open = false;
					}}>Log Out</Button
				>
			{:else}
				<Button
					href="/login"
					onclick={() => {
						open = false;
					}}>Login</Button
				>
			{/if} -->
			<Button
				href="/login"
				onclick={() => {
					open = false;
				}}>Login</Button
			>
		</div>
	</Sheet.Content>
</Sheet.Root>
