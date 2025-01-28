<script lang="ts">
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	import Metadata from '$lib/components/Metadata.svelte';
	import Navbar from '$lib/components/Navbar/Nav.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<Toaster />

<Metadata />

<Navbar />

<main class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]">
	{@render children()}
</main>

<footer class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]"></footer>
