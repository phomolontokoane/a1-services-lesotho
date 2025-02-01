import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const { data: Users, error: err } = await supabase.from('User').select('*');
	if (err) {
		console.error(err);
		error(500, 'Something wrong happend');
	}
	return { users: Users ?? [] };
}) satisfies PageServerLoad;
