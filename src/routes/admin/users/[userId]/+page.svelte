<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { customer } = data;
</script>

<h2>User #{customer.id}</h2>

<section class="my-3 space-y-3">
	<p>Name: {customer.first_name} {customer.last_name}</p>
	<p>
		<span>Phone Number:</span>
		<a href={`tel:+266${customer.phone_number}`}>+266 {customer.phone_number}</a>
	</p>
</section>
