import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { productId } = params;

	let { data: products, error: err } = await supabase.from('Products').select('*').eq('id', +productId);
    if (!products || products.length <= 0) {
        error(402, "Not found")
    }

	return {product: products[0]};
}) satisfies PageServerLoad;
