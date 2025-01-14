<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Menu } from 'lucide-svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger class="lg:hidden">
		<Menu />
	</Sheet.Trigger>
	<Sheet.Content
		onCloseAutoFocus={(e) => { // these functions stops some weird behavoir after closing
			e.preventDefault();
		}}
        onOpenAutoFocus={(e) => {
			e.preventDefault();
		}}
	>
		<Sheet.Header>
			<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
			<Sheet.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
