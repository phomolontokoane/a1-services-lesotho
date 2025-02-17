import { supabase } from '$lib';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	registerUser: async ({ request, cookies }) => {
		const formdata = await request.formData();

		const first_name = formdata.get('first_name') as string | null;
		const last_name = formdata.get('last_name') as string | null;
		const phone_number = formdata.get('phone_number') as string | null;
		const password = formdata.get('password') as string | null;
		const cpassword = formdata.get('cpassword') as string | null;

		if (!first_name || !last_name || !phone_number || !password || !cpassword) {
			return { success: false, error: 'One of the values is missing' };
		}

		if (cpassword != password) {
			return { sucess: false, error: 'Password and Confirm Password do not match' };
		}

		const { data: user, error: err } = await supabase
			.from('User')
			.insert({ first_name, last_name, phone_number: +phone_number, password })
			.select('*')
			.maybeSingle();

		if (err) {
			console.error(err);
			return { success: false, error: err.message };
		}

		if (user) {
			cookies.set('user_session', user.id.toString(), {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 86400
			});
		}

		return { success: true };
	}
};
