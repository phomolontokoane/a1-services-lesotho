<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>A1-Services</title>
	<meta name="title" content="A1-Services" />
	<meta name="description" content="We deliver all sorts of products from famous stores to you" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://a1-services-lesotho.vercel.app/" />
	<meta property="og:title" content="A1-Services" />
	<meta
		property="og:description"
		content="We deliver all sorts of products from famous stores to you"
	/>
	<meta property="og:image" content="/favicon.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://a1-services-lesotho.vercel.app/" />
	<meta property="twitter:title" content="A1-Services" />
	<meta
		property="twitter:description"
		content="We deliver all sorts of products from famous stores to you"
	/>
	<meta property="twitter:image" content="/favicon.png" />

	<!-- Meta Tags Generated with https://metatags.io -->
</svelte:head>

<nav class="mx-auto flex justify-center sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]">
	<a href="/" class="flex items-center gap-1 text-2xl font-bold text-primary">
		<img src="/favicon.png" alt="logo" width="150" />
	</a>
</nav>

<main class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]">
	{@render children()}
</main>

<footer class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]"></footer>
