<script lang="ts">
	import MyAlertDialog from '$lib/components/MyAlertDialog.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { toast } from 'svelte-sonner';
	import type { ActionData, PageData } from './$types';
	import { supabase } from '$lib';
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();

	let checked = $state(false);

	let open = $state(false);
	let loading = $state(false);
	let notsubmit = $state(form?.data?.img ? false : true);

	let files = $state<FileList>();
	let imgPath = $state(form?.data?.img ?? '');

	let uploadImg = async () => {
		open = false;
		loading = true;

		if (!files || files.length < 1) return;
		const file = files[0];

		try {
			let { data, error } = await supabase.storage
				.from('images')
				.upload(`products/${file.name}`, file, {
					cacheControl: '3600',
					upsert: false
				});

			if (error) {
				console.error(error);
				toast.error('Failed to upload file');
				return;
			}

			imgPath = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/products/${file.name}`;
			notsubmit = false;
			toast.success('Uploaded file');
		} catch (error) {
			console.error(error);
			toast.error('Failed to upload file');
		} finally {
			loading = false;
		}
	};
</script>

{#if loading}
	<div class="flex justify-center gap-3 pt-6">
		<LoaderCircle class="animate-spin" />
		<p>Uploading Image</p>
	</div>
{:else if notsubmit}
	<h1 class="my-3 text-center text-3xl font-semibold">Upload Product Image</h1>
	<div class="space-y-3">
		<Button
			onclick={() => {
				open = true;
			}}
			class="w-full rounded">Upload Image</Button
		>
		<p class="mt-1 text-sm">Product can be added once image has been uploaded</p>
	</div>
{:else if form?.success}
	<section>
		<h1 class="text-center text-3xl font-semibold">Product has been Created</h1>
		<Button href={`/admin/shop/${data.storeId}/products`} class="w-full rounded"
			>Go to Products</Button
		>
	</section>
{:else}
	<form method="POST" action="?/addProduct" class="space-y-3">
		<div>
			<Label for="name">Name</Label>
			<Input name="name" id="name" value={form?.data?.name ?? ''} required />
		</div>
		<div>
			<Label for="qty">Quantity</Label>
			<Input name="qty" id="qty" type="number" value={form?.data?.qty ?? ''} required min={0} />
		</div>

		<div>
			<Label for="price">Price (R)</Label>
			<Input
				name="price"
				id="price"
				type="number"
				value={form?.data?.price ?? ''}
				required
				min={0}
			/>
		</div>

		<div class="flex items-center gap-2 pt-2">
			<Checkbox class="rounded" name="isfeatured" id="isfeatured" bind:checked />
			<input type="hidden" name="isfeatured" bind:value={checked} />
			<Label for="isfeatured">isFeatured</Label>
		</div>

		<div class="space-y-2">
			<Label for="img">Image</Label>
			<img
				class="mx-auto aspect-square w-2/3 rounded object-cover object-center"
				src={imgPath}
				alt="product"
			/>
		</div>
		<input type="hidden" id="img" name="img" bind:value={imgPath} />

		<Button class="w-full rounded text-lg" disabled={notsubmit} type="submit">Add Product</Button>
	</form>
{/if}

<MyAlertDialog bind:open title="Upload Image" action={uploadImg}>
	<input type="file" accept="image/*" bind:files />
</MyAlertDialog>
