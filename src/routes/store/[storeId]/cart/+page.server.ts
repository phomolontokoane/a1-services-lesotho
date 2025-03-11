import { supabase } from '$lib';
import type { buyProduct } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	order: async ({ request }) => {
		let formdata = await request.formData();
		const price = parseFloat(formdata.get('total_price') as string);
		const products = formdata.get('products') as string | null;
		const owners = formdata.get('store') as string | null;
		const user_id = parseInt(formdata.get('user') as string, 10);

		// Validate inputs
		// console.debug("price", price)
		// console.debug("products", products)
		// console.debug("user_id", user_id)
		// console.debug("owners", owners)
		if (!price || !products || !owners || isNaN(user_id)) {
			return { success: false, error: 'One of the fields is not filled or invalid' };
		}

		let Products: buyProduct[];
		try {
			Products = JSON.parse(products);
		} catch (e) {
			return { success: false, error: 'Invalid products JSON' };
		}

		let update_products = Products.map((v) => ({ id: v.id, wanted_qty: v.qty }));

		try {
			let { error } = await supabase.rpc('update_product_quantities', {
				products: update_products
			});
			if (error) {
				console.error(error);
				return { success: false, error: error.message };
			}

			// Insert order into the database
			const { data, error: order_error } = await supabase
				.from('Orders')
				.insert([{ price, products: Products as any, owners, user_id }])
				.select()
				.maybeSingle();

			if (order_error) {
				console.error(order_error);
				return { success: false, error: order_error.message };
			}

			return { success: true, order: data };
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Something went wrong' };
		}
	}
};
