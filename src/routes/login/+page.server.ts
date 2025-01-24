import type { PageServerLoad, Actions } from './$types.js';
import { supabase } from '$lib';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		let formdata = await event.request.formData();
		let phone_number = formdata.get('phone_number') ?? '';
		let password = formdata.get('password') ?? '';

		console.log(phone_number, password);

		let { data } = await supabase.from('User').select('*').eq('phone_number', phone_number);
		if (data != null && data.length > 0) {
			let user = data[0];
			if (password == user.password) {
				event.cookies.set('user_session', user.id.toString(), {
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
