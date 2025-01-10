<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { products, best } = data;

	let productAvaliable =
		products != null && best != null && products.length != 0 && best.length != 0;

	let currentBest = $state({
		img: [''],
		name: '',
		price: 0
	});

	if (best != null) {
		currentBest.img = best[0].img;
		currentBest.name = best[0].name;
		currentBest.price = best[0].price;
	}
</script>


{#if productAvaliable}
	<!-- Best -->
	<div class="embla">
		<div class="embla__container">
			<div class="embla__slide">Slide 1</div>
			<div class="embla__slide">Slide 2</div>
			<div class="embla__slide">Slide 3</div>
		</div>
	</div>

	<!-- Products -->
	<section></section>
{:else}
	<h1>This Store is not selling yet</h1>
{/if}
