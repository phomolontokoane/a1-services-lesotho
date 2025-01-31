<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button';

	let { data }: { data: PageData } = $props();
	let { orders, storeId } = data;
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
