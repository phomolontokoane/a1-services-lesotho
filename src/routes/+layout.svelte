<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex justify-center mx-auto sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]">
	<a href="/" class="text-primary flex items-center gap-1 text-2xl font-bold">
		<img src="/favicon.png" alt="logo" width="150" />
	</a>
</nav>

<main class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]">
	{@render children()}
</main>

<footer class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]"></footer>
