import { supabase } from '$lib';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    let session = event.cookies.get('user_session') ?? "";
	let {data} = await supabase.from("User").select("*").eq("id", +session);

    if (data != null && data.length > 0) {
        let user = data[0]
        event.locals.user = {
            id: user.id,
            name: user.first_name,
            phone_number: user.phoneNumber.toString()
        }
    }

	const response = await resolve(event);
	return response;
};