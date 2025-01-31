<script lang="ts">
	import { supabase } from '$lib';
	import MyAlertDialog from '$lib/components/MyAlertDialog.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { ChevronLeft } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	let { product } = data;

	let loading = $state(false);

	let updated = $state(false);
	let editMode = $state(false);
	let name = $state(product.name);
	let price = $state(product.price);
	let isfeatured = $state(product.isfeatured ?? false);
	// let qty = $state(product.qty);
	let openEdit = $state(false);

	let deleted = $state(false);
	let openDelete = $state(false);

	let setQty = $state(product.qty);
	let newQty = $state(1);
	let openAdd = $state(false);

	const channels = supabase
		.channel('custom-update-channel')
		.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Products' }, (payload) => {
			if ((payload.new.id = product.id)) {
				setQty = payload.new.qty;
			}
		})
		.subscribe();

	let deleteProduct = async () => {
		loading = true;
		let { error } = await supabase.from('Products').delete().eq('id', product.id);
		if (!error) {
			deleted = true;
		} else {
			console.error(error);
			toast.error('Something wrong happend');
		}

		loading = false;
	};
	let editProduct = async () => {
		loading = true;
		let { error } = await supabase
			.from('Products')
			.update({ name, price, isfeatured })
			.eq('id', product.id);
		if (!error) {
			updated = true;
		} else {
			console.error(error);
			toast.error('Something wrong happend');
		}

		loading = false;
	};

	let addStock = async () => {
		loading = true;
		openAdd = false;
		let { error } = await supabase.rpc('add_stock_to_product', {
			product_id: product.id,
			quantity: newQty
		});
		if (error) {
			console.error(error);
		} else {
			toast.success('Added Stock');
		}
		loading = false;
	};
</script>

{#if deleted}
	<section class="space-y-6">
		<h1 class="text-center text-3xl">Product Deleted</h1>
		<Button class="w-full rounded" href={`/admin/shop/${data.storeId}/products`}
			>Go to other Products
		</Button>
	</section>
{:else if updated}
	<section class="space-y-6">
		<h1 class="text-center text-3xl">Product Updated</h1>
		<Button class="w-full rounded" href={`/admin/shop/${data.storeId}/products`}
			>Go to other Products
		</Button>
	</section>
{:else if editMode}
	<section class="space-y-3">
		<Button
			class="rounded"
			variant="outline"
			onclick={() => {
				editMode = false;
			}}
		>
			<ChevronLeft />
			Exit
		</Button>
		<div>
			<Label for="name">Name</Label>
			<Input id="name" bind:value={name} />
		</div>
		<!-- <div>
			<Label>Quanity</Label>
			<Input bind:value={qty} type="number"/>
		</div> -->
		<div>
			<Label for="price_e">Price (R)</Label>
			<Input id="price_e" bind:value={price} type="number" />
		</div>
		<div class="flex items-center gap-2">
			<Checkbox id="isfeatured" bind:checked={isfeatured} />
			<Label for="isfeatured">Is Featured</Label>
		</div>

		<Button
			class="w-full"
			onclick={() => {
				openEdit = true;
			}}>Update</Button
		>
	</section>

	<MyAlertDialog bind:open={openEdit} title={`Edit Product #${product.id}`} action={editProduct} />
{:else if loading}
	<h1>Loading ...</h1>
{:else}
	<section class="space-y-3">
		<h1 class="text-3xl">Product #{product.id} - {product.name}</h1>
		<img
			src={product.img[0]}
			alt="product"
			class="mx-auto aspect-square w-2/3 rounded object-cover object-center"
		/>
		<div class="space-y-2 p-3 text-xl font-medium">
			<p>Price : R {product.price}</p>
			<div class="flex justify-between">
				<p>Quanitity : {setQty}</p>
				<Button
					class="rounded"
					onclick={() => {
						openAdd = true;
					}}>Add Stock</Button
				>
			</div>
			<p>Featured Item: {product.isfeatured ? 'Yes' : 'No'}</p>
		</div>

		<div class="flex gap-3">
			<Button
				class="w-1/2 rounded"
				variant="destructive"
				onclick={() => {
					openDelete = true;
				}}>Delete Product</Button
			>
			<Button
				class="w-1/2 rounded"
				onclick={() => {
					editMode = true;
				}}>Edit Product</Button
			>
		</div>
	</section>

	<!-- Delete Product Dialog -->
	<MyAlertDialog
		bind:open={openDelete}
		title={`Delete Product #${product.id}`}
		descrption="Deleting this product is irreversible"
		action={deleteProduct}
	/>
	<!-- Add Qty Dialog -->
	<MyAlertDialog
		bind:open={openAdd}
		title={`Add stock to Product #${product.id}`}
		descrption="Update quantity"
		action={addStock}
	>
		<Label for="stock">Add Stock</Label>
		<Input
			class="w-1/4 rounded"
			name="stock"
			id="stock"
			type="number"
			bind:value={newQty}
			min={1}
		/>
	</MyAlertDialog>
{/if}
