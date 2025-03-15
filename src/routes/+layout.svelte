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

	onMount(() => {
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
		}
	})
</script>

<Toaster />

<Metadata />

<Navbar />

<main class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]">
	{@render children()}
</main>

<footer class="mx-auto p-3 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1200px]"></footer>
