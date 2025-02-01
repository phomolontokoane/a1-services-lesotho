<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { cart, clearStore, removeCartItem } from '$lib/stores/cart';
	import { ShoppingCart, X } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { innerWidth } from 'svelte/reactivity/window';
	import { store } from '$lib/stores/store';
	import { derived as from } from 'svelte/store';

	let open = $state(false);
	let isDesktop = $derived((innerWidth.current ?? 1000) > 1000);

	let storeCart = from(cart, ($cart) => $cart.filter((c) => c.owners == $store.owners));

	let handleRemove = (id: number) => {
		removeCartItem(id);
		toast.success('Removed Item', { duration: 1000 });
	};

	let cartLink = from(store, ($store) => ($store != null ? `/store/${$store.owners}/cart` : '/'));
</script>

{#if isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger class={`${page.url.pathname.includes('store') ? '' : 'hidden'}`}>
			<ShoppingCart size={24} />
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Cart</Dialog.Title>
			</Dialog.Header>

			<div class="flex flex-col gap-3">
				<ScrollArea class="h-[40vh]">
					{#each $storeCart as c}
						<div class="grid grid-cols-3 items-center justify-items-center gap-3">
							<Button size="icon" class="rounded" onclick={() => handleRemove(c.id)}><X /></Button>
							<img class="aspect-square object-cover object-center" src={c.img[0]} alt="product" />
							<div>
								<p>{c.name}</p>
								<p>R {c.price}</p>
							</div>
						</div>
						<hr class="my-2" />
					{:else}
						<h3>No Items</h3>
					{/each}
				</ScrollArea>
				<div class="mb-10 mt-7 flex justify-between gap-3">
					<Button
						variant="destructive"
						class="grow rounded text-xl"
						onclick={() => clearStore($store.owners)}>Clear</Button
					>
					<Button
						class="grow rounded text-xl"
						href={$cartLink}
						onclick={() => {
							open = false;
						}}>View Cart</Button
					>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger class={`${page.url.pathname.includes('store') ? '' : 'hidden'}`}>
			<ShoppingCart size={24} />
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Cart</Drawer.Title>
			</Drawer.Header>

			<div class="flex flex-col gap-3 p-3">
				<ScrollArea class="h-[40vh]">
					{#each $storeCart as c}
						<div class="grid grid-cols-3 items-center justify-items-center gap-3">
							<Button size="icon" class="rounded" onclick={() => handleRemove(c.id)}><X /></Button>
							<img class="aspect-square object-cover object-center" src={c.img[0]} alt="product" />
							<div>
								<p>{c.name}</p>
								<p>R {c.price}</p>
							</div>
						</div>
						<hr class="my-2" />
					{:else}
						<h3>No Items</h3>
					{/each}
				</ScrollArea>
				<div class="mb-10 mt-7 flex justify-between gap-3">
					<Button
						variant="destructive"
						class="grow rounded text-xl"
						onclick={() => clearStore($store.owners)}>Clear</Button
					>
					<Button
						class="grow rounded text-xl"
						href={$cartLink}
						onclick={() => {
							open = false;
						}}>View Cart</Button
					>
				</div>
			</div>
		</Drawer.Content>
	</Drawer.Root>
{/if}
