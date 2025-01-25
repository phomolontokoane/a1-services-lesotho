<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<section class="grid-cols-2 gap-3">
    <a href={`/admin/${data.storeId}/orders`}>Orders</a>
    <a href={`/admin/${data.storeId}/products`}>Products</a>
</section>