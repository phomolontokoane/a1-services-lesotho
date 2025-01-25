import { supabase } from '$lib';
import type { buyProduct } from '$lib/types';
import type { Json } from '$lib/types/supabase';
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
		if (!price || !products || !owners || isNaN(user_id)) {
			return { success: false, error: 'One of the fields is not filled or invalid' };
		}

		let Products: buyProduct[];
		try {
			Products = JSON.parse(products);
		} catch (e) {
			return { success: false, error: 'Invalid products JSON' };
		}

		try {
			// Insert order into the database
			const { data, error } = await supabase
				.from('Orders')
				.insert([{ price, products: Products as any, owners, user_id }])
				.select();

			if (error) {
				console.error(error);
				return { success: false, error: error.message };
			}

			// Update product quantities in bulk
			for (const p of Products) {
				try {
					const { id, name, avaliableQty, qty } = p;
					const new_qty = avaliableQty - qty;
					const { data ,error: updateError } = await supabase
						.from('Products')
						.update({ qty: new_qty })
						.eq('name', name)
						.select("*")

					if (updateError) {
						throw new Error(`Failed to update product ${id}`);
					}
					console.debug(data, id)
				} catch (err) {
					console.error(err);
					return { success: false, error: `Error updating product` };
				}
			}

			return { success: true, order: data };
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Something went wrong' };
		}
	}
};
