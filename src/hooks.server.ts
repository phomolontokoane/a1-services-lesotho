import { supabase } from '$lib';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let session = event.cookies.get('user_session');
	if (session) {
		let { data, error: userError } = await supabase.from('User').select('*').eq('id', +session);
		if (data != null && data.length > 0) {
			let user = data[0];
			event.locals.user = {
				id: user.id,
				name: user.first_name,
				phone_number: user.phone_number.toString()
			};
		}
	}

	const sb_token = event.cookies.get('sb_token');
	if (sb_token) {
		const { data: admin_data, error: adminError } = await supabase.auth.getUser(sb_token);

		if (admin_data.user) {
			event.locals.admin_user = admin_data.user;
		}
		if (adminError) {
			console.error('Error in getting admin user in hooks.server.ts: ',adminError);
		}
	}

	const response = await resolve(event);
	return response;
};
