import { supabase } from '$lib';
import type { LayoutServerLoad } from './$types';

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
			} else if (userError) console.error(userError);
		}
	}

	return { user };
}) satisfies LayoutServerLoad;
