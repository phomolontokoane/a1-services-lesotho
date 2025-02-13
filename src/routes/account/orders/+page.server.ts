import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const info = await parent();
	const userId = info.account.id;
	const { data, error: err } = await supabase
		.from('Orders')
		.select('*')
		.eq('user_id', userId)
		.neq('delivered', true);
	if (err) {
		console.error('Error in /acount/orders: ', err);
		error(500, 'Something wrong happend');
	}
	const orders = data ?? [];
	return { orders };
}) satisfies PageServerLoad;
