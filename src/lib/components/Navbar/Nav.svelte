<script>
	import Cart from './Cart.svelte';
	import Menu from './Menu.svelte';
</script>

<nav
	class="mx-auto flex items-center justify-around sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]"
>
	<Menu />
	<a href="/" class="flex items-center gap-1 text-2xl font-bold text-primary">
		<img src="/favicon.png" alt="logo" width="150" />
	</a>
	<Cart />
</nav>
