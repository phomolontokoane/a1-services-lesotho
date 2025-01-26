import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { storeId } = params;

	let { data,error: Error } = await supabase.from('Store').select('*').eq('owners', storeId);
    if (!data || data.length < 0) {
        if (Error) console.error(Error.message)
        error(402, "Store not found")
    }

	return {storeId};
}) satisfies LayoutServerLoad;
