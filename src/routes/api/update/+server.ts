import { supabase } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	let { data, error } = await supabase.rpc('update_product_quantities', {
		products: [{ id: 3, wanted_qty: 3 }]
	});
	if (error) console.error(error);
	else console.log(data);

	if (error) console.error(error);
	else console.log(data);

	if (error) {
		console.error('Error updating product quantities:', error);
	} else {
		console.log('Product quantities updated successfully:', data);
	}
	return json({ data });
};
