<script lang="ts">
	import { user } from '$lib/stores/user';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '../ui/button';
	import { Bell } from 'lucide-svelte';
	import { supabase } from '$lib';
	import { page } from '$app/state';

	type Orders = {
		id: number;
		price: number;
		isdone: boolean | null;
	};

	let doneOrders = $state<Orders[]>([]);

	const handleNotifications = async (id: number) => {
		const { data, error } = await supabase
			.from('Orders')
			.select('id, price, isdone')
			.eq('user_id', id)
			.neq('delivered', true);
		if (error) console.error(error.message);
		const orders = data ?? [];
		doneOrders = orders;
	};

	user.subscribe((u) => {
		if (u.id != -1) {
			const channels = supabase
				.channel(`check-orders-user-${u.id}`)
				.on(
					'postgres_changes',
					{
						event: '*',
						schema: 'public',
						table: 'Orders',
						filter: `user_id=eq.${u.id}`
					},
					(payload) => {
						console.log(payload);
						const { old, new: New, eventType } = payload;
						if (eventType == 'UPDATE') {
							const { id, price, isdone, delivered } = New;
							if (delivered) return;
							const values = doneOrders.filter((v) => v.id != old.id);
							doneOrders = [...values, { id, price, isdone }];
						} else if (eventType == 'INSERT') {
							const { id, price, isdone, delivered } = New;
							if (delivered) return;
							doneOrders = [...doneOrders, { id, price, isdone }];
						} else if (eventType == 'DELETE') {
							const values = doneOrders.filter((v) => v.id != old.id);
							doneOrders = values;
						}
					}
				)
				.subscribe();
			handleNotifications(u.id);
		}
	});
</script>

<Sheet.Root>
	<Sheet.Trigger class={{ hidden: page.url.pathname.includes('admin') }}><Bell /></Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Notification</Sheet.Title>
			<Sheet.Description>You will get a notification when your orders are done</Sheet.Description>
			{#if $user.id != -1}
				<Table.Root>
					<Table.Caption>A list of your recent orders.</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Order ID</Table.Head>
							<Table.Head class="text-left">Price</Table.Head>
							<Table.Head class="text-right">Status</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each doneOrders as o}
							<Table.Row>
								<Table.Cell>{o.id}</Table.Cell>
								<Table.Cell class="text-left">R {o.price}</Table.Cell>
								<Table.Cell class="text-right">{o.isdone ? 'Come collect' : 'Preparing'}</Table.Cell
								>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			{:else}
				<p>Login to see notifications</p>
			{/if}
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
