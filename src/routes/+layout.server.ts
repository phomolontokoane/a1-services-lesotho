import { supabase } from '$lib';
import type { LayoutServerLoad } from './$types';
import { user as User } from '$lib/stores/user';

export const load = (async ({ locals, cookies }) => {
	let user = locals.user;
	if (!user) {
		let session = cookies.get('user_session');
		if (session) {
			let { data, error: userError } = await supabase.from('User').select('*').eq('id', +session);
			if (data != null && data.length > 0) {
				let user_info = data[0];
				user = {
					id: user_info.id,
					name: user_info.first_name,
					phone_number: user_info.phone_number.toString()
				};
			}
		}
	}

	if (user) User.set(user);
	return { user };
}) satisfies LayoutServerLoad;
