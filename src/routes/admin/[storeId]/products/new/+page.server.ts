import { supabase } from '$lib';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	addProduct: async ({ request, params }) => {
		const formdata = await request.formData();

		// console.debug(formdata);

		let name = formdata.get('name') as string | null;
		let price = formdata.get('price') as string | null;
		let qty = formdata.get('qty') as string | null;
		let img = formdata.get('img') as string | null;
		let isfeatured = formdata.get('isfeatured') as string | null;

		const data = { name, isfeatured, img, price, qty };

		if (!name || !price || !qty || !img || isNaN(+price) || isNaN(+qty)) {
			return { success: false, error: 'one of the elements is missing', data };
		}

		try {
			let { data, error } = await supabase
				.from('Products')
				.insert({ img: [img], name, price: +price, qty: +qty, owners: params.storeId })
				.select('*');
			if (error) {
				console.error(error);
				return { success: false, error: error.message };
			}
			return { success: true, info: data ?? [] };
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Something wrong happend' };
		}
	}
};
