<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { addCart } from '$lib/stores/cart';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { name, img, price, qty } = data.info;
	let comments = data.comments;

	let cImg = $state(img[0]);

	let handleAddCart = () => {
		addCart({ ...data.info, qty: 1, avaliableQty: qty });
		toast.success('Item added to cart', { duration: 1000 });
	};
</script>

<section class="grid gap-3">
	<img
		class="mx-auto aspect-square w-2/3 rounded object-cover object-center"
		src={cImg}
		alt="product"
		loading="eager"
	/>
	<div class="space-y-2">
		<h1 class="text-4xl font-semibold">{name}</h1>
		<p class="text-3xl font-semibold text-primary">R {price}</p>

		{#if qty > 0}
			<Button class="w-full rounded font-semibold" onclick={handleAddCart}>Add to Cart</Button>
		{:else}
			<Button class="w-full rounded font-semibold">Out of stock</Button>
		{/if}
	</div>
</section>

<hr class="my-8" />

<section>
	<h2 class="text-xl font-bold">Comments</h2>
	<div class="grid grid-cols-1 gap-3">
		{#each comments as c}
			<div class="p-3">
				<div class="flex justify-between">
					<p>{c.User.first_name} {c.User.last_name}</p>
					<p>{c.rating} / 5</p>
				</div>
				<p>{c.message}</p>
			</div>
		{:else}
			No comments yet
		{/each}
	</div>
</section>
