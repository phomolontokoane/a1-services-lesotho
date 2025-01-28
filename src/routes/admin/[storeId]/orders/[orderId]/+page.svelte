<script lang="ts">
	import type { buyProduct } from '$lib/types';
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button';
	import { supabase } from '$lib';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let { order } = data;
	let products = order.products as unknown as buyProduct[];
	let user = order.User;

	let loading = $state(false);

	const handleIsDone = async () => {
		const { error } = await supabase
			.from('Orders')
			.update({ isdone: true })
			.eq('id', order.id)
			.select();
		if (!error) {
			toast.success('Set order to ');
			goto(`/admin/${data.storeId}/orders`);
		} else {
			toast.error('Operation failed');
		}
	};
	const handleIsDelivered = async () => {
		const { error } = await supabase
			.from('Orders')
			.update({ delivered: true })
			.eq('id', order.id)
			.select();
		if (!error) {
			toast.success('Set order to ');
			goto(`/admin/${data.storeId}/orders`);
		} else {
			toast.error('Operation failed');
		}
	};
</script>

<section>
	<h1>Order #{order.id}</h1>
	<h2>User: {user.first_name} {user.last_name}</h2>
	<h2>PhoneNumber: <a href={`tel:${user.phone_number}`} type="tel">{user.phone_number}</a></h2>

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

	<div>
		{#if !order.isdone}
			<Button onclick={handleIsDone} class="my-6 w-full" disabled={loading}>Order Done</Button>
		{:else if !order.delivered}
			<Button onclick={handleIsDelivered} class="my-6 w-full" disabled={loading}
				>Order delivered</Button
			>
		{:else}
			<div></div>
		{/if}
	</div>
</section>
