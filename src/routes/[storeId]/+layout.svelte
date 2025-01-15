<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
	import { store } from '$lib/stores/store';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
    store.set(data.store)
</script>

{@render children()}