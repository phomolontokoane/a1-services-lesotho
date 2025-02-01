import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { is_super_admin } = await parent();
	if (!is_super_admin) {
		redirect(302, '/admin');
	}
	return {};
}) satisfies LayoutServerLoad;
