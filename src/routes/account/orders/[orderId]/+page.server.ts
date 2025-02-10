import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { data: order, error: err } = await supabase
		.from('Orders')
		.select('*')
		.eq('id', +params.orderId)
		.maybeSingle();

	if (!order) {
		error(402, 'Order does not exist');
	} else if (err) {
		console.error(`Error in /account/orders/${params.orderId}`, err);
        error(500, 'Something wrong happened')
	}

	return { order };
}) satisfies PageServerLoad;
