<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { product } = data;
</script>

<section>
	<h1>Product #{product.id} - {product.name}</h1>
	<img
		src={product.img[0]}
		alt="product"
		class="aspect-square w-full rounded object-cover object-center"
	/>
	<p>Quanitity: {product.qty}</p>
</section>
