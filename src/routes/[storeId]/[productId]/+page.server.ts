import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	let { productId } = params;

	let { data: products } = await supabase.from('Products').select('*').eq('id', +productId);
	if (!products || products.length == 0) {
        error(404, 'Not Found');
	}

    let cData = await supabase
        .from('Comments')
        .select(
            `
    message,
    rating,
    created_at,
    Users ( firstname, lastname )
    `
        )
        .eq('product', +productId);

    let comments = cData.data ?? [];

	return { info: products[0], comments };
}) satisfies PageServerLoad;
