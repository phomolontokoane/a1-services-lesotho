import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, url}) => {
	const admin_user = locals.admin_user;
	if (!admin_user && url.pathname != '/admin/login') {
		redirect(307, '/admin/login');
	}

	return { admin_user };
}) satisfies LayoutServerLoad;
