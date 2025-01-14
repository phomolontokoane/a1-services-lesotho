<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { cart, removeCartItem } from '$lib/stores/cart';
	import { ShoppingCart, X } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { derived } from 'svelte/store';
	import { page } from '$app/state';
	import { getAllContexts, getContext } from 'svelte';
	import { toast } from 'svelte-sonner';

	let storeId = page.params.storeId
	let storeCart = derived(cart, ($cart) =>
		$cart.filter((c) => {
            console.log(c.owners)
            console.log(storeId)
			return c.owners == storeId;
		})
	);

	let handleRemove = (id: number) => {
		removeCartItem(id);
		toast.success('Removed Item');
	};

	$inspect($storeCart)
</script>

<Dialog.Root>
	<Dialog.Trigger class={`${page.url.pathname == '/' ? 'hidden' : ''}`}>
		<ShoppingCart size={24} />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Cart</Dialog.Title>
		</Dialog.Header>

		<div class="flex flex-col gap-3">
			{#each $storeCart as c}
				<div class="flex items-center justify-between gap-3">
					<Button size="icon" onclick={() => handleRemove(c.id)}><X /></Button>
					<img
						class="aspect-square w-1/3 object-cover object-center"
						src={c.img[0]}
						alt="product"
					/>
					<div>
						<p>{c.name}</p>
						<p>R {c.price}</p>
					</div>
				</div>
			{:else}
				<h3>No Items</h3>
			{/each}
		</div>
	</Dialog.Content>
</Dialog.Root>
