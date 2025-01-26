import { supabase } from '$lib';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { storeId } = params;

	let { data: orders, error } = await supabase.from('Orders').select('*, User (phone_number)').eq('owners', storeId);

	return { orders: orders ?? [] };
}) satisfies PageServerLoad;
