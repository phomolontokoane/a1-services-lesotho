<script lang="ts">
	import type { Product } from '$lib/types';

	let { products, storeId }: { products: Product[]; storeId: string } = $props();
</script>

<section class="my-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
	{#each products as p}
		<a href={`/store/${storeId}/${p.id}`}>
			<div>
				<img
					class="aspect-square w-full rounded object-cover object-center"
					src={p.img[0]}
					alt="product"
				/>
				<h3 class="text-xl font-bold">{p.name}</h3>
				<p class="text-lg font-bold">R {p.price}</p>
			</div>
		</a>
	{/each}
</section>
