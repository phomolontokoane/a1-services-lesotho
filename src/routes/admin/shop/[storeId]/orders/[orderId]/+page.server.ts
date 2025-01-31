import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { orderId } = params;

	let { data: orders, error: err } = await supabase
		.from('Orders')
		.select('*, User(*)')
		.eq('id', +orderId);
	if (!orders || orders.length <= 0) {
		error(402, 'Not found');
	}

	return { order: orders[0] };
}) satisfies PageServerLoad;
