<script lang="ts">
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	import Metadata from '$lib/components/Metadata.svelte';
	import Navbar from '$lib/components/Navbar/Nav.svelte';
	import type { LayoutData } from './$types';
	import { onMount, type Snippet } from 'svelte';
	import { user } from '$lib/stores/user';
	import { toast } from 'svelte-sonner';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	if (data.user) user.set(data.user);

	let isSubscribed = $state(false)

	onMount(async () => {
		if (Notification.permission !== "granted") {
			toast("Please allow notifications to receive updates", {
				duration: 100000,
				dismissable: true,
				action: {
					label: "Allow",
					onClick: () => {
						Notification.requestPermission().then((permission) => {
							if (permission === "granted") {
								toast("Notifications enabled");
							} else {
								toast("Notifications disabled");
							}
						});
					},
				},
			});
		} else {
			isSubscribed = await checkSubscription();

			if (!isSubscribed) {
				await subscribeUser();
			}
		}
	})

	async function checkSubscription() {
		if ('serviceWorker' in navigator) {
			const registration = await navigator.serviceWorker.ready;
			const subscription = await registration.pushManager.getSubscription();
			return subscription !== null;
		}
		return false;
	}

	async function sendSubscriptionToServer(subscription: PushSubscription) {
		try {
			const res = await fetch('/api/addSubscription', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ subscription })
			});
			if (!res.ok)
				throw new Error(`Error saving subscription on server: ${res.statusText} (${res.status})`);
		} catch (error) {
			console.error('Error saving subscription on server:', error);
			unsubscribe();
		}
	}

	async function subscribeUser() {
		if ('serviceWorker' in navigator) {
			try {
				const response = await fetch('/api/vapidPubKey');
				const { data } = await response.json();

				const registration = await navigator.serviceWorker.ready;
				const subscription = await registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: data
				});
				isSubscribed = true;
				console.log('Subscription:', JSON.stringify(subscription));
				sendSubscriptionToServer(subscription);
			} catch (err) {
				console.error('Error subscribing:', err);
			}
		}
	}

	async function unsubscribe() {
		if ('serviceWorker' in navigator) {
			const registration = await navigator.serviceWorker.ready;
			const subscription = await registration.pushManager.getSubscription();
			if (subscription) {
				await subscription.unsubscribe();
				isSubscribed = false;
			}
		}
	}
</script>

<Toaster />

<Metadata />

<Navbar />

<main class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]">
	{@render children()}
</main>

<footer class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]"></footer>
