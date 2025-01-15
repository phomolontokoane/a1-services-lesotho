<script lang="ts">
	import { derived } from 'svelte/store';
	import type { PageData } from './$types';
	import { cart, clearStore } from '$lib/stores/cart';
	import { store } from '$lib/stores/store';
	import CartProduct from '$lib/components/CartProduct.svelte';
	import { Button } from '$lib/components/ui/button';

	let { data }: { data: PageData } = $props();
	let storeCart = derived(cart, ($cart) => $cart.filter((c) => c.owners == $store.owners));
	let totalPrice = $state(0);

	storeCart.subscribe((store) => {
		let sum = 0;
		store.forEach((c) => {
			sum += c.qty * c.price;
		});
		totalPrice = sum;
	});
</script>

<h1 class="mb-7 text-3xl font-semibold">Cart</h1>

<div class="grid grid-cols-1 gap-3">
	{#each $storeCart as c}
		<CartProduct item={c} />
	{:else}
		<h2>No Items</h2>
	{/each}
</div>

<hr class="my-6" />

<div class="space-y-3">
	<p class="text-xl font-semibold">Total Price: R {totalPrice}</p>
	<div class="flex gap-3">
		<Button
			variant="destructive"
			class="grow rounded text-xl"
			onclick={() => clearStore($store.owners)}>Clear</Button
		>
		<Button class="grow rounded text-xl">Order</Button>
	</div>
</div>
