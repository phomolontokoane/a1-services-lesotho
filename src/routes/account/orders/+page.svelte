<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';

	let { data }: { data: PageData } = $props();
	let { orders } = data;
</script>

<h2>Orders</h2>

<Table.Root>
	<Table.Caption>A list of your recent orders.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">ID</Table.Head>
			<Table.Head>Price</Table.Head>
			<Table.Head>Done?</Table.Head>
			<Table.Head>Payed?</Table.Head>
			<Table.Head class="text-right"></Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each orders as o}
			<Table.Row>
				<Table.Cell class="font-medium">{o.id}</Table.Cell>
				<Table.Cell>{o.price}</Table.Cell>
				<Table.Cell>{o.isdone ? 'Yes' : 'No'}</Table.Cell>
				<Table.Cell>{o.is_payed ? 'Yes' : 'No'}</Table.Cell>
				<Table.Cell class="text-right"
					><Button href={`/account/orders/${o.id}`}>View</Button></Table.Cell
				>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
