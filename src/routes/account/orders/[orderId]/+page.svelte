<script lang="ts">
	import type { buyProduct } from '$lib/types';
    import type { PageData } from './$types';
    import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';

    let { data }: { data: PageData } = $props();
    let { order } = data;
	let products = order.products as unknown as buyProduct[];
</script>

<section>
    <h1>Order #{order.id}</h1>
    <Table.Root>
		<Table.Caption>Current Orders</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">ID</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Image</Table.Head>
				<Table.Head class="text-right">Qty</Table.Head>
				<Table.Head class="text-right">Total</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each products as product, i (i)}
				<Table.Row>
					<Table.Cell class="font-medium">{product.id}</Table.Cell>
					<Table.Cell>{product.name}</Table.Cell>
					<Table.Cell>
						<img src={product.img[0]} alt="product" class="w-[100px]" />
					</Table.Cell>
					<Table.Cell class="text-right">{product.qty}</Table.Cell>
					<Table.Cell class="text-right">R {product.qty * product.price}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
		<Table.Footer>
			<Table.Row>
				<Table.Cell colspan={4}>Total</Table.Cell>
				<Table.Cell class="text-right">R {order.price}</Table.Cell>
			</Table.Row>
		</Table.Footer>
	</Table.Root>

    {#if !order.is_payed}
        <Button href={`/account/orders/${order.id}/pay`}>Pay</Button>        
    {/if}
</section>