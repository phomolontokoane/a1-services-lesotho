<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Menu } from 'lucide-svelte';
	import { Button } from '../ui/button';

	let open = $state(false);
</script>

<Sheet.Root {open}>
	<Sheet.Trigger class={`lg:hidden`}>
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
			<a href="/">Home</a>
			<hr />
			<Button
				href="/login"
				onclick={() => {
					open = false;
				}}>Login</Button
			>
		</div>
	</Sheet.Content>
</Sheet.Root>
