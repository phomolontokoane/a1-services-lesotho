<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { Toaster } from "$lib/components/ui/sonner/index.js";

	import Metadata from '$lib/components/Metadata.svelte';
	import Navbar from '$lib/components/Navbar/Nav.svelte';

	import { cart } from '$lib/stores/cart';
	import type { buyProduct } from '$lib/types';
	let { children } = $props();

	onMount(() => {
		let strCart = localStorage.getItem('cart');
		let myCart: buyProduct[];
		if (!strCart) {
			localStorage.setItem('cart', '[]');
			myCart = [];
		} else {
			myCart = JSON.parse(strCart) as buyProduct[];
		}

		cart.set(myCart);
		cart.subscribe((cart) => {
			let str = JSON.stringify(cart);
			localStorage.setItem('cart', str);
		});
	});
</script>

<Toaster />

<Metadata />

<Navbar />

<main class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]">
	{@render children()}
</main>

<footer class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]"></footer>
