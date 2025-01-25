import { supabase } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	// if (cookies.get('admin_session')) {
	// 	redirect(300, '/admin');
	// }
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	login_admin: async ({ request, cookies, locals }) => {
		// Get form data
		const formdata = await request.formData();
		const email = formdata.get('email') as string | null;
		const password = formdata.get('password') as string | null;

		if (!email || !password) {
			return { success: false, error: 'One of the feilds is missing' };
		}

		try {
			let { data, error } = await supabase.auth.signUp({
				email,
				password
			});

			if (error) {
				console.error(error);
				return { success: false, error: error.message };
			}

			const { user, session } = data;

			if (user && session) {
				locals.admin_user = user;
				cookies.set('admin_session', session.access_token, {
					path: '/',
					httpOnly: true,
					secure: true,
					sameSite: 'strict'
				});

				return {
					success: true
				};
			}
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Something went wrong' };
		}
	}
};
