import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
	let { storeId } = params;
	let { data: store } = await supabase.from('Store').select('*').eq('owners', storeId);

	if (!store || store.length == 0) {
		error(404, 'Not found');
	}

	return { storeId, store: store[0] };
}) satisfies LayoutServerLoad;
