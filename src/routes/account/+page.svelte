<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { account } = data;
</script>

<h2 class="text-lg">Hello {account.first_name} {account.last_name}</h2>

<section class="my-3 space-y-3">
	<!-- <Button class="rounded">Change Password</Button> -->
	<Button class="rounded w-full text-md" href="/account/orders">Pending Orders</Button>
	<Button class="rounded w-full text-md" href="/account/subscription">Subscription</Button>
</section>
