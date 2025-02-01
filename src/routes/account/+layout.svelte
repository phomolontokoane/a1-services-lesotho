<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<h1 class="text-2xl font-semibold text-primary">Account</h1>
<hr class="my-3" />
{@render children()}
