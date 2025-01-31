import { supabase } from '$lib';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { storeId } = params;

	let { data: products, error } = await supabase.from('Products').select('*').eq('owners', storeId);

	return { products: products ?? [] };
}) satisfies PageServerLoad;
