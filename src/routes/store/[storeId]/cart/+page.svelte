<script lang="ts">
	import { derived } from 'svelte/store';
	import type { ActionData, PageData } from './$types';
	import { cart, clearStore } from '$lib/stores/cart';
	import { store } from '$lib/stores/store';
	import CartProduct from '$lib/components/CartProduct.svelte';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();
	let { user } = data;

	if (form?.error) {
		console.error(form.error);
	}

	if (form?.success) {
		clearStore($store.owners);
	}

	let storeCart = derived(cart, ($cart) => $cart.filter((c) => c.owners == $store.owners));
	let totalPrice = $state(0);
	let products = $state('[]');

	let back_cart = new URLSearchParams({ store: $store.owners }).toString();

	storeCart.subscribe((store) => {
		let sum = 0;
		store.forEach((c) => {
			sum += c.qty * c.price;
		});
		totalPrice = sum;
		products = JSON.stringify(store);
	});
</script>

<h1 class="mb-7 text-3xl font-semibold">Cart</h1>

{#if form?.success}
	<div class="space-y-3">
		<h2 class="text-center text-3xl">Order Has been made</h2>
		<p>
			Please wait for your order to be prepared - you will be notified to collect it within 20mins.
		</p>
		<p>
			Please pay for your order
		</p>
		<Button href={`/account/orders/${form.order?.id ?? ""}`} class="w-full rounded text-xl">Payment</Button>
	</div>
{:else if $storeCart.length < 1}
	<h2>No Items</h2>
{:else}
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
			{#if user}
				<form action="?/order" method="POST" class="grow">
					<input type="hidden" name="total_price" bind:value={totalPrice} />
					<input type="hidden" name="products" bind:value={products} />
					<input type="hidden" name="store" value={$store.owners} />
					<input type="hidden" name="user" value={user.id} />
					<Button class="w-full rounded text-xl" type="submit">Order</Button>
				</form>
			{:else}
				<Button href={`/login?${back_cart}`} class="grow rounded text-xl">Login</Button>
			{/if}
		</div>
	</div>
{/if}
