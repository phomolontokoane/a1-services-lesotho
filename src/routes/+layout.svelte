<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import type { buyProduct } from '$lib/types';
	import { cart } from '$lib/stores/cart';
	import Metadata from '$lib/components/Metadata.svelte';
	import Navbar from '$lib/components/Navbar/Nav.svelte';
	let { children } = $props();

	onMount(() => {
		let strCart = localStorage.getItem("cart");
		let myCart: buyProduct[];
		if (!strCart) {
			localStorage.setItem("cart", "[]")
			myCart = []
		} else {
			myCart = JSON.parse(strCart) as buyProduct[]
		}
		
		cart.set(myCart);
	})
</script>

<Metadata />

<Navbar />

<main class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]">
	{@render children()}
</main>

<footer class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]"></footer>
