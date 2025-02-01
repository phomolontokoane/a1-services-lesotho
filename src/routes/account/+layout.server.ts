import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}

	const { data, error: err } = await supabase
		.from('User')
		.select('*')
		.eq('id', locals.user.id)
		.maybeSingle();

	if (!data) {
		error(401, 'You are not registered');
	} else if (err) {
		console.error(err);
		error(500, 'Somthing wrong happened');
	}

	return { account: data };
}) satisfies LayoutServerLoad;
