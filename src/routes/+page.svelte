<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let stores = data.stores;

</script>

<section>
	{#if stores != null && stores.length != 0}
		<h1 class="mb-4 text-3xl font-bold text-primary">Stores</h1>

		{#each stores as store}
			<div class="w-1/2 rounded border p-3">
				<a href={`/${store.owners}`} class="space-y-3">
					<h3 class="font-semibold text-xl">{store.name}</h3>
					<button class="p-1 bg-accent rounded">Visit Store</button>
				</a>
			</div>
		{/each}
	{:else}
		<h2>No stores</h2>
	{/if}
</section>
