<script lang="ts">
	import { supabase } from '$lib';
	import MyAlertDialog from '$lib/components/MyAlertDialog.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { product } = data;

	let open = $state(false);
	let loading = $state(false);
	let complete = $state(false);

	const channels = supabase
		.channel('custom-update-channel')
		.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Products' }, (payload) => {
			console.log('Change received!', payload);
		})
		.subscribe();

	let descrption = `Deleting this product is irreversible`;
	let title = `Delete Product #${product.id}`;

	let deleteProduct = async () => {
		loading = true;
		let { error } = await supabase.from('Products').delete().eq('id', product.id);
		if (!error) {
			complete = true;
		}

		loading = false;
	};
</script>

{#if complete}
	<section class="space-y-3">
		<h1 class="text-3xl">Order Deleted</h1>
		<a href={`/admin/${data.storeId}/products`}>Go to other Products </a>
	</section>
{:else if loading}
	<h1>Loading ...</h1>
{:else}
	<section class=" space-y-3">
		<h1 class="text-3xl">Product #{product.id} - {product.name}</h1>
		<img
			src={product.img[0]}
			alt="product"
			class="mx-auto aspect-square w-2/3 rounded object-cover object-center"
		/>
		<div class="space-y-2 p-3 text-xl font-medium">
			<p>Price : R {product.price}</p>
			<p>Quanitity : {product.qty}</p>
			<p>Featured Item: {product.isfeatured ? 'Yes' : 'No'}</p>
		</div>

		<div class="flex gap-3">
			<Button
				class="w-1/2 rounded"
				variant="destructive"
				onclick={() => {
					open = true;
				}}>Delete Product</Button
			>
			<Button class="w-1/2 rounded">Edit Product</Button>
		</div>
	</section>

	<MyAlertDialog bind:open {title} {descrption} action={deleteProduct} />
{/if}
