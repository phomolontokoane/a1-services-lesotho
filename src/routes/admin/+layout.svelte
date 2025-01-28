<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<h1 class="text-4xl text-primary">Admin</h1>
<hr class="mb-3 mt-3 text-primary" />

{@render children()}
