import { supabase } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PAY_LESOTHO_KEY, VERIFY_ECOCASH, VERIFY_MPESA } from '$env/static/private';

export const load = (async ({ params }) => {
	const { data: order, error: err } = await supabase
		.from('Orders')
		.select('*')
		.eq('id', +params.orderId)
		.maybeSingle();

	if (!order) {
		error(402, 'Order does not exist');
	} else if (err) {
		console.error(`Error in /account/orders/${params.orderId}`, err);
        error(500, 'Something wrong happened')
	}

	if (order.is_payed != true && order.pay_refrence) {
		const headers = new Headers()
		headers.set("Authorization", "Bearer " + PAY_LESOTHO_KEY)

		let isPayed = false;
		if (order.pay_method == "Ecocash") {
			let response = await fetch(VERIFY_ECOCASH + order.pay_refrence, {headers})
			const data = await response.json()

			if (data.status_code == "200") isPayed = true
		} else if (order.pay_method == "Mpesa") {
			let response = await fetch(VERIFY_MPESA + order.pay_refrence, {headers})
			const data = await response.json()
			if (data.status_code == "200") isPayed = true
		}

		if (isPayed) {
			const {error} = await supabase.from('Orders').update({is_payed: true}).eq('id', order.id)
			if (error) {
				console.error(`Error in updating ispayed for order #${order.id}: `, error)
			}
		}
	}

	return { order };
}) satisfies PageServerLoad;
