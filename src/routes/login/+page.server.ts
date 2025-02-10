import type { PageServerLoad, Actions } from './$types.js';
import { supabase } from '$lib';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const { cookies, request, url } = event;

		// Get form data
		const formdata = await request.formData();
		// console.debug('🚀 ~ login: ~ formdata:', formdata);
		const phone_number = formdata.get('phone_number');
		const password = formdata.get('password');
		const store = formdata.get('store');

		if (!phone_number || !password) {
			return { success: false, error: 'Phone number and password are required' };
		}

		try {
			// Query user from database
			const { data, error } = await supabase
				.from('User')
				.select('id, password')
				.eq('phone_number', +phone_number);

			if (error) {
				console.error(error);
				return { success: false, error: 'Database query failed' };
			}

			if (data && data.length > 0) {
				const user = data[0];

				// Compare password
				const isPasswordValid = password == user.password;
				if (isPasswordValid) {
					// Set secure cookie
					cookies.set('user_session', user.id.toString(), {
						path: '/',
						httpOnly: true,
						secure: true,
						sameSite: 'strict',
						maxAge: 86400
					});
					return { success: true, store };
				} else {
					return { success: false, error: 'Invalid credentials' };
				}
			}

			return { success: false, error: 'User not found' };
		} catch (err) {
			console.error(err);
			return { success: false, error: 'An unexpected error occurred' };
		}
	}
};
