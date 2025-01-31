<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button';

	let { data }: { data: PageData } = $props();
	let { products, storeId } = data;
</script>

<div class="flex justify-between">
	<h1 class="text-xl font-semibold">Products</h1>
	<Button class="rounded text-lg" href={`/admin/shop/${storeId}/products/new`}>New Product</Button>
</div>

<hr class="my-4" />

<Table.Root>
	<!-- <Table.Caption>Current Orders</Table.Caption> -->
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Id</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Image</Table.Head>
			<Table.Head class="text-right">Qty</Table.Head>
			<Table.Head class="text-right">{''}</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each products as product, i (i)}
			<Table.Row>
				<Table.Cell class="font-medium">{product.id}</Table.Cell>
				<Table.Cell>{product.name}</Table.Cell>
				<Table.Cell>
					<img
						src={product.img[0]}
						alt="product"
						class="aspect-square w-[100px] object-cover object-center"
					/>
				</Table.Cell>
				<Table.Cell class="text-right">{product.qty}</Table.Cell>
				<Table.Cell class="text-right"
					><Button class="rounded" href={`/admin/shop/${storeId}/products/${product.id}`}
						>View</Button
					></Table.Cell
				>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
