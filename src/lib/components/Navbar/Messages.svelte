<script lang="ts">
	import { user } from '$lib/stores/user';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '../ui/button';
	import { Bell } from 'lucide-svelte';
	import { supabase } from '$lib';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';

	type Orders = {
		id: number;
		price: number;
		isdone: boolean | null;
	};

	let doneOrders = $state<Orders[]>([]);
	let numDone = $derived.by(() => {
		let sum = 0;
		for (const order of doneOrders) {
			if (order.isdone) ++sum;
		}
		return sum;
	});

	let showNotification = (id: number) => {
		const options = {
			body: `Your order is ready to be collected`,
			icon: 'https://a1-services-lesotho.vercel.app/favicon.png', // Replace with your icon URL
			vibrate: [200, 100, 200] // Vibration pattern for phones
		};

		new Notification(`Come collect Order#${id} 😊👌`, options);
	};

	// $effect(() => {
	// 	if (browser) {
	// 		if (Notification.permission === 'granted') {
	// 			doneOrders.forEach((o) => {
	// 				if (o.isdone) showNotification(o.id);
	// 			});
	// 		}
	// 	}
	// });

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

	const requestShowNotifications = async () => {
		if (browser) {
			if (Notification.permission == 'granted') toast('Permission already');
			const req = await Notification.requestPermission();
			if (req == 'granted') {
				toast.success('We will notify when orders are done');
			} else if (req == 'denied') {
				toast.error('Please Allow to show done orders');
			}
		}
	};

	onMount(() => {
		if (!('Notification' in window)) {
			toast.error('Notifications are not supported on your device.');
		}
	});

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
						const { old, new: New, eventType } = payload;
						if (eventType == 'UPDATE') {
							const { id, price, isdone, delivered } = New;
							if (delivered) {
								const values = doneOrders.filter((v) => v.id != old.id);
								doneOrders = values;
							}
							const values = doneOrders.filter((v) => v.id != old.id);
							doneOrders = [...values, { id, price, isdone }];
							// if (isdone && !delivered) showNotification(id);
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
	<Sheet.Trigger class={`relative ${page.url.pathname.includes('admin') ? 'hidden' : ''}`}>
		<Bell />
		{#if numDone > 0}
			<div class="absolute left-4 top-4 rounded-full bg-red-700 px-1 text-xs">{numDone}</div>
		{/if}
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Notification</Sheet.Title>
			<Sheet.Description>You will get a notification when your orders are done</Sheet.Description>
			<!-- <Button onclick={() => showNotification(0)}>Show Notification</Button> -->
			{#if Notification.permission != 'granted'}
				<Button onclick={requestShowNotifications}>Allow Notification</Button>
			{/if}
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
