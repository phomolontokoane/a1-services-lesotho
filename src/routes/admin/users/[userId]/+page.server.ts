import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { userId } = params;
	const { data: customer, error: err } = await supabase
		.from('User')
		.select('*')
		.eq('id', +userId)
		.maybeSingle();
	if (err) {
		console.error(err);
		error(500, 'Something wrong happend');
	} else if (!customer) {
		error(402, `User #${userId} does not exist`);
	}
	return { customer };
}) satisfies PageServerLoad;
