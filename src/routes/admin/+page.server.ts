import { supabase } from '$lib';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	let { data: Store, error } = await supabase.from('Store').select('*');

	return { store: Store ?? [] };
}) satisfies PageServerLoad;
