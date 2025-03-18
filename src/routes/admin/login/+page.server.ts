import { supabase } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (locals.admin_user) {
		redirect(303, '/admin');
	}
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	login_admin: async ({ request, cookies }) => {
		// Get form data
		const formdata = await request.formData();
		const email = formdata.get('email') as string | null;
		const password = formdata.get('password') as string | null;

		if (!email || !password) {
			return { success: false, error: 'One of the feilds is missing' };
		}

		try {
			let { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (error) {
				console.error(error);
				return { success: false, error: error.message };
			}

			const { user } = data;

			if (data.session?.access_token) {
				cookies.set('sb_token', data.session.access_token, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: 86400,
				});
			}

			if (user) {
				return {
					success: true,
					owner: user.id,
					is_super: (user.user_metadata.is_super_admin ?? false) as boolean
				};
			}
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Something went wrong' };
		}
	}
};
