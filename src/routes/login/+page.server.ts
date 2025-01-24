import type { PageServerLoad, Actions } from './$types.js';
import { supabase } from '$lib';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		let formdata = await request.formData();
		let phone_number = formdata.get('phone_number') ?? '';
		let password = formdata.get('password') ?? '';

		console.log(phone_number, password);

		let { data } = await supabase.from('User').select('*').eq('phone_number', phone_number);
		if (data != null && data.length > 0) {
			let user = data[0];
			if (password == user.password) {
				cookies.set('user_session', user.id.toString(), {
					path: '/'
				});
			} else {
				return { success: false };
			}
		}
		return {
			success: true
		};
	}
};
