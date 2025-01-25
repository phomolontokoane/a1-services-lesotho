import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { storeId } = params;

	let { error: Error, count } = await supabase.from('Store').select('id').eq('owners', storeId);
    if (!count || count < 1 ) {
        if (Error) console.error(Error.message)
        error(402, "Store not found")
    }

	return {storeId};
}) satisfies LayoutServerLoad;
