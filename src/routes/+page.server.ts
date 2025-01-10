import { supabase } from '$lib';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	let { data: stores, error } = await supabase.from('Store').select('*');

	return { stores };
}) satisfies PageServerLoad;
