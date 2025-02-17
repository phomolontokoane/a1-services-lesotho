import type { Actions, PageServerLoad } from './$types';
import { PAYLESOTHO_KEY, PAY_ECOCASH_URL, PAY_MPESA_URL } from '$env/static/private';
import { supabase } from '$lib';
import { error, fail } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const { orderId } = params;
	const { data: order, error: err } = await supabase
		.from('Orders')
		.select('*, Store(*)')
		.eq('id', +orderId)
		.maybeSingle();

	if (!order) {
		error(402, 'Order does not exist');
	} else if (err) {
		console.error(`Error in load function /accounts/orders/${orderId}/pay: `, err);
		error(500, 'Somthing wrong happend');
	}

	return { order };
}) satisfies PageServerLoad;

export const actions: Actions = {
	payEconet: async ({ request }) => {
		const formdata = await request.formData();

		const phone_number = formdata.get('phone_number');
		const merchantName = formdata.get('ecocash_name');
		const price = formdata.get('amount');
		const till = formdata.get('ecocash');
		const orderId = formdata.get('orderId');

		if (!phone_number || !price || !till || !merchantName || !orderId || isNaN(+price)) {
			return fail(400, { success: false, error: 'One of the inputs is missing' });
		} else if (phone_number.toString().at(0) != '6' || phone_number.toString().length != 8) {
			return fail(400, { success: false, error: 'PhoneNumber is not an Econet Number' });
		} else if (+price < 0) {
			return fail(400, { success: false, error: 'Price is a negative number' });
		}

		const body = JSON.stringify({
			merchantid: till.toString(),
			amount: price.toString(),
			mobileNumber: phone_number.toString(),
			merchantname: merchantName.toString(),
			client_reference: `Payment for order#${orderId}`
		});

		const headers = new Headers();
		headers.set('Authorization', 'Bearer ' + PAYLESOTHO_KEY);

		const options: RequestInit = { method: 'POST', body, headers };
		const response = await fetch(PAY_ECOCASH_URL, options);

		const data = await response.json();

		if (data.status == 400 || !response.ok) {
			console.error('Error in action payEconent: ', data.message);
			return fail(400, { success: false, error: data.message as string });
		}

		if (!data.reference) {
			return fail(500, { success: false, error: 'No reference' });
		}

		const { error } = await supabase
			.from('Orders')
			.update({ pay_refrence: data.pay_refrence as string, pay_method: 'Ecocash' })
			.eq('id', +orderId);

		if (error) {
			console.error('Error in action payeconent', error);
			fail(500, {
				success: false,
				error: 'Error in updating payRefreance, if payment was successfull show phone proof'
			});
		}

		return { success: true, refreance: data.refreance as string };
	},
	payMpesa: async ({ request }) => {
		const formdata = await request.formData();
		console.debug("Formdata", formdata)

		const phone_number = formdata.get('phone_number');
		const merchantName = formdata.get('mpesa_name');
		const price = formdata.get('amount');
		const till = formdata.get('mpesa');
		const orderId = formdata.get('orderId');

		if (!phone_number || !price || !till || !merchantName || !orderId || isNaN(+price)) {
			return fail(400, { success: false, error: 'One of the inputs is missing' });
		} else if (phone_number.toString().at(0) != '5' || phone_number.toString().length != 8) {
			return fail(400, { success: false, error: 'PhoneNumber is not an mpesa Number' });
		} else if (+price < 0) {
			return fail(400, { success: false, error: 'Price is a negative number' });
		}

		const body = JSON.stringify({
			merchantid: till.toString(),
			amount: price.toString(),
			mobileNumber: phone_number.toString(),
			merchantname: merchantName.toString(),
			client_reference: `Payment for order#${orderId}`
		});

		const headers = new Headers();
		const auth = `Bearer $10$KLstBWXvvqvOc91kSNUSs.Y9z2q3XFSHYcvHMLWab4ArDzbXB5tl2`
		console.debug("Token", PAYLESOTHO_KEY)
		headers.set('Authorization', auth);

		const options: RequestInit = { method: 'POST', body, headers };
		
		console.debug("Options for request", options)
		console.debug("Paylesotho url", PAY_MPESA_URL)

		try {
			const response = await fetch(PAY_MPESA_URL, options);
			console.debug("Response", response)
			const data = await response.json();
			const text = await response.text();
			console.debug("Response Body: ",text)
	
			if (data.status == 400 || !response.ok) {
				console.error('Error in action payEconent: ', data.message);
				return fail(400, { success: false, error: data.message as string });
			}
	
			if (!data.reference) {
				return fail(500, { success: false, error: 'No reference' });
			}
	
			const { error } = await supabase
				.from('Orders')
				.update({ pay_refrence: data.pay_refrence as string, pay_method: 'Mpesa' })
				.eq('id', +orderId);
	
			if (error) {
				console.error('Error in action payeconent', error);
				fail(500, {
					success: false,
					error: 'Error in updating payRefreance, if payment was successfull show phone proof'
				});
			}
	
			return { success: true, refreance: data.refreance as string };
		} catch (error) {
			console.error("Error in payMpesa function", error)
			return fail(500, {success: false, error: "Somthing went wrong"})
		}
	}
};
