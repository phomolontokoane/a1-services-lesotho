import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { supabase } from '$lib';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

        let {data} = await supabase.from("User").select("*").eq("phone_number", form.data.phone_number);
        if (data != null && data.length > 0 ) {
            let user = data[0]
            if (form.data.password == user.password) {
                event.cookies.set("user_session", user.id.toString(), {
                    path: '/'
                })
            }
        }
		return {
			form
		};
	}
};
