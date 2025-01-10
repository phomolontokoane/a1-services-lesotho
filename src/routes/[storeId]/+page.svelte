<script lang="ts">
	import Best from '$lib/components/Best.svelte';
	import Products from '$lib/components/Products.svelte';
	import type { Product } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { products, best, storeId, store } = data;

	let productAvaliable =
		products != null && best != null && products.length != 0 && best.length != 0;
</script>

<!-- <h1 class="mb-3 text-4xl font-semibold underline text-primary">{store.name}</h1> -->

{#if productAvaliable}
	<!-- Best -->
	<Best best={best as Product[]} {storeId}/>

	<!-- Products -->
	<Products products={products as Product[]} {storeId} />
{:else}
	<h1>This Store is not selling yet</h1>
{/if}
