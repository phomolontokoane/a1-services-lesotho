<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section>
	{#each data.store as store}
		<div class="w-1/2 rounded border p-3">
			<a href={`/admin/${store.owners}`} class="space-y-3">
				<h3 class="text-xl font-semibold">{store.name}</h3>
				<button class="rounded bg-accent p-1">Visit Store</button>
			</a>
		</div>
    {:else}
        <h2>No stores available</h2>
	{/each}
</section>
