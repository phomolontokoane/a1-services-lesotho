<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button';
	import { supabase } from '$lib';
	import type { Json } from '$lib/types/supabase';
	import { onDestroy } from 'svelte';

	type OrderT = {
		created_at: string | null;
		delivered: boolean | null;
		id: number;
		isdone: boolean | null;
		owners: string;
		price: number;
		products: Json;
		user_id: number;
		User: {
			phone_number: number;
		};
	};

	let { data }: { data: PageData } = $props();
	let { orders: Orders, storeId } = data;
	let orders = $state(Orders);

	const channels = supabase
		.channel('custom-all-channel')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'Orders' }, (payload) => {
			const { eventType } = payload;
			if (eventType == 'UPDATE') {
				const change = payload.new as OrderT;
				const { id } = change;
				const values = orders.filter((o) => o.id != id);
				orders = [change, ...values];
			} else if (eventType == 'INSERT') {
				const change = payload.new as OrderT;
				const { id } = change;
				orders = [change, ...orders];
			} else if (eventType == 'DELETE') {
				const id = payload.old.id;
				orders = orders.filter((o) => o.id != id);
			}
		})
		.subscribe();

	onDestroy(() => {
		channels.unsubscribe();
	});
</script>

<Table.Root>
	<Table.Caption>Current Orders</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">User</Table.Head>
			<Table.Head>Done</Table.Head>
			<Table.Head>Delivered</Table.Head>
			<Table.Head class="text-right">Amount</Table.Head>
			<Table.Head class="text-right">{''}</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each orders as order, i (i)}
			<Table.Row>
				<Table.Cell class="font-medium">{order.User.phone_number}</Table.Cell>
				<Table.Cell>{order.isdone}</Table.Cell>
				<Table.Cell>{order.delivered}</Table.Cell>
				<Table.Cell class="text-right">{order.price}</Table.Cell>
				<Table.Cell class="text-right"
					><Button href={`/admin/shop/${storeId}/orders/${order.id}`}>View</Button></Table.Cell
				>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
