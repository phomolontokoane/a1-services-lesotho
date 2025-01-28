<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';

	let { data }: { data: PageData } = $props();
</script>

<section class="grid grid-cols-2 gap-3">
	<Button href={`/admin/${data.storeId}/orders`}>Orders</Button>
	<Button href={`/admin/${data.storeId}/products`}>Products</Button>
</section>
