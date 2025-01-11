<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { name, img, price, qty } = data.info;
	let comments = data.comments;

	let cImg = $state(img[0]);
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
			<button class="flex w-full justify-center rounded bg-primary p-2 font-semibold"
				>Add to Cart</button
			>
		{:else}
			<button class="flex w-full justify-center rounded bg-primary p-2 font-semibold"
				>Out of stock</button
			>
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
					<p>{c.Users.firstname} {c.Users.lastname}</p>
                    <p>{c.rating} / 5</p>
				</div>
				<p>{c.message}</p>
			</div>
		{:else}
			No comments yet
		{/each}
	</div>
</section>
