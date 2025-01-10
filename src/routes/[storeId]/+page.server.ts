import { supabase } from '$lib';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { storeId } = params;

	let { data: products, error } = await supabase.from('Products').select('*').eq('owners', storeId);

	if (!products) {
		return { best: null, products };
	}

	let best = products.filter((p) => p.isfeatured);

	return { products, best };
}) satisfies PageServerLoad;
