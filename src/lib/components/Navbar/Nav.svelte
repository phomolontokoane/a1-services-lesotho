<script>
	import { page } from '$app/state';
	import { store } from '$lib/stores/store';
	import Cart from './Cart.svelte';
	import Menu from './Menu.svelte';
	import Messages from './Messages.svelte';

	let homeLink = $state('/');
	if (page.url.pathname.includes('admin')) homeLink = '/admin';
</script>

<nav
	class="mx-auto flex items-center justify-around sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]"
>
	<Menu />
	<div class="flex items-center justify-center gap-1 text-xl font-bold text-primary">
		<a href={homeLink}>
			<img src="/favicon.png" alt="logo" width="100" />
		</a>
		{#if $store.id != -1}
			<a href={`/store/${$store.owners}`}>{$store.name}</a>
		{/if}
	</div>

	<div class={`flex items-center gap-4 ${page.url.pathname.includes('admin') ? 'hidden' : ''}`}>
		<Cart />
		<Messages />
	</div>
</nav>
