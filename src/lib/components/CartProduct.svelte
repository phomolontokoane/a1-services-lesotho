<script lang="ts">
	import { cart, removeCartItem } from '$lib/stores/cart';
	import { X } from 'lucide-svelte';
	import { Button } from './ui/button';
	import type { buyProduct } from '$lib/types';

	interface Props {
		item: buyProduct;
	}

	let { item }: Props = $props();
	let qty = $state(item.qty);

    let handleChange = () => {
        cart.update((c) => {
			let index = c.findIndex((i) => i.id == item.id);
			if (index != undefined) {
				c[index].qty = qty;
			}
			return c;
		});
    }
</script>

<div class="flex items-center justify-between gap-3">
	<Button size="icon" class="rounded" onclick={() => removeCartItem(item.id)}><X /></Button>
	<img class="aspect-square w-1/3 object-cover object-center" src={item.img[0]} alt="product" />
	<select bind:value={qty} onchange={handleChange}>
		{#each { length: item.avaliableQty }, num}
			<option value={num}>{num}</option>
		{/each}
	</select>
	<div>
		<p>{item.name}</p>
		<p>R {item.price}</p>
	</div>
</div>
