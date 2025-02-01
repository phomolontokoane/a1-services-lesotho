import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
	const admin_user = locals.admin_user;
	if (!admin_user && url.pathname != '/admin/login') {
		redirect(307, '/admin/login');
	} else if (
		admin_user &&
		!admin_user.user_metadata.is_super_admin &&
		!url.pathname.includes(admin_user.id)
	) {
		redirect(307, `/admin/shop/${admin_user.id}`);
	}

	const is_super_admin: boolean = admin_user?.user_metadata.is_super_admin ?? false;

	return { admin_user, is_super_admin };
}) satisfies LayoutServerLoad;
