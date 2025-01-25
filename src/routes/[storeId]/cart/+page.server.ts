import { supabase } from '$lib';
import type { buyProduct } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	order: async ({ request }) => {
		let formdata = await request.formData();
		let price = formdata.get('total_price') as number | null;
		let products = formdata.get('products') as string | null;
		let owners = formdata.get('store') as string | null;
		let user_id = formdata.get('user') as string | null;

		if (!price || !products || !owners || !user_id) {
			return { success: false, error: 'one of the fields is not filled' };
		}

		try {

			// const { error: upError } = await supabase
			// 	.from('Products')
			// 	.update({ other_column: 'otherValue' })
			// 	.eq('some_column', 'someValue')
			// 	.select();

			const { data, error } = await supabase
				.from('Orders')
				.insert([{ price, products: JSON.parse(products), owners, user_id: +user_id }])
				.select();

			if (error) {
				console.error(error);
				return { success: false, error: error.message };
			}

			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Something went wrong' };
		}
	}
};
