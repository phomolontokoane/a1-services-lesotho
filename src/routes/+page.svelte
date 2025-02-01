<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { initialStore, store as Store } from '$lib/stores/store';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let stores = data.stores;

	Store.set(initialStore);
</script>

<section>
	{#if stores != null && stores.length != 0}
		<h1 class="mb-4 text-3xl font-bold text-primary">Stores</h1>

		<div class="grid grid-cols-2 gap-3">
			{#each stores as store}
				<div class="grow rounded border p-3">
					<a href={`/store/${store.owners}`} class="space-y-3">
						<h3 class="text-xl font-semibold">{store.name}</h3>
						<Button variant="secondary" class="w-full rounded bg-accent p-1">Visit Store</Button>
					</a>
				</div>
			{/each}
		</div>
	{:else}
		<h2>No stores</h2>
	{/if}
</section>
