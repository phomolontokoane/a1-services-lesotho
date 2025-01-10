<script lang="ts">
	import type { product } from '$lib/types';
	import { Circle } from 'lucide-svelte';
	import { CircleChevronRight } from 'lucide-svelte';
	import { CircleChevronLeft } from 'lucide-svelte';

	let { best }: { best: product[] } = $props();

	let currentBest = $state(best[0]);
	let currentNum = $state(0);

	$effect(() => {
		currentBest = best[currentNum];
	});
</script>

<section class="rounded border-2 border-primary p-3 lg:w-3/4 lg:mx-auto">
	<div class="lg:grid lg:grid-cols-2">
		<img class="max-lg:mx-auto aspect-square w-3/4 rounded lg:justify-self-center" src={currentBest.img[0]} alt="product" />
		<div class="p-3 lg:space-y-3">
			<h3 class="text-3xl font-bold text-primary lg:text-5xl">{currentBest.name}</h3>
			<p class="text-2xl font-bold lg:text-5xl">R {currentBest.price}</p>
		</div>
	</div>
	<div class="flex items-center justify-between p-3">
		<button
			class="rounded bg-secondary p-2"
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
			class="rounded bg-secondary p-2"
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
