<script lang="ts">
	import type { Product } from '$lib/types';
	import { Circle } from 'lucide-svelte';
	import { CircleChevronRight } from 'lucide-svelte';
	import { CircleChevronLeft } from 'lucide-svelte';

	let { best, storeId }: { best: Product[]; storeId: string } = $props();

	let currentNum = $state(0);
	let currentBest = $derived(best[currentNum]);
</script>

<section class="rounded border-2 border-primary p-3 lg:mx-auto lg:w-3/4">
	<!-- Info -->
	<div class="lg:grid lg:grid-cols-2">
		<img
			class="aspect-square w-3/4 rounded object-cover object-center max-lg:mx-auto lg:justify-self-center"
			src={currentBest.img[0]}
			alt="product"
		/>
		<div class="p-3 lg:flex lg:flex-col lg:justify-center lg:gap-3 lg:space-y-3">
			<h3 class="text-3xl font-bold text-primary lg:text-5xl">{currentBest.name}</h3>
			<p class="text-2xl font-bold lg:text-5xl">R {currentBest.price}</p>
		</div>
	</div>

	<a
		class="mx-3 flex justify-center rounded bg-primary py-1 text-2xl font-semibold"
		href={`/store/${storeId}/${currentBest.id}`}>View</a
	>

	<!-- Nav -->
	<div class="flex items-center justify-between p-3">
		<button
			class="rounded bg-primary p-2"
			onclick={() => {
				if (currentNum == 0) {
					currentNum = best.length - 1;
				} else {
					currentNum -= 1;
				}
			}}><CircleChevronLeft /></button
		>
		<div class="flex items-center gap-1">
			{#each best as _, i}
				<button
					onclick={() => {
						currentNum = i;
					}}><Circle class={`w-6 ${i == currentNum ? 'text-primary' : 'text-secondary'}`} /></button
				>
			{/each}
		</div>
		<button
			class="rounded bg-primary p-2"
			onclick={() => {
				if (currentNum == best.length - 1) {
					currentNum = 0;
				} else {
					currentNum += 1;
				}
			}}
		>
			<CircleChevronRight /></button
		>
	</div>
</section>
