import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PAY_MPESA_URL, PAY_LESOTHO_KEY } from '$env/static/private';
import type { buyPostData } from '$lib/types';

export const GET: RequestHandler = async () => {
	return json({ message: 'Hello from /api/mpesa/pay' });
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		if (!request.body) {
			return json({ message: 'No data provided' }, { status: 400, statusText: 'No data provided' });
		} else if (request.headers.get('content-type')?.includes('application/json') === false) {
			console.debug('🚀 ~ request.headers.get(content-type):', request.headers.get('content-type'));
			const mpesaTextData = await request.text();
			console.debug('🚀 ~ mpesaTextData:', mpesaTextData);
			return json({ message: 'Invalid content-type' }, { status: 400, statusText: 'Invalid content-type' });
		}

		const data: Partial<buyPostData> = await request.json();
		console.log('🚀 ~ constPOST:RequestHandler= ~ data:', data);
		const { phone_number, merchantName, price, reference, merchantId } = data;

		const dataMising = !phone_number || !merchantName || !price || !reference || !merchantId;
		if (dataMising) {
			return json(
				{ message: 'One of the values is missing' },
				{
					status: 400,
					statusText: 'One of the values is missing'
				}
			);
		}
		const notFormat = isNaN(+phone_number) || isNaN(+price) || isNaN(+merchantId);
		if (notFormat) {
			return json(
				{ message: 'One of the values is not in the right format' },
				{
					status: 400,
					statusText: 'One of the values is not in the right format'
				}
			);
		}
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer $10$${PAY_LESOTHO_KEY}`);
		myHeaders.append('Content-Type', 'application/json');

		const raw = JSON.stringify({
			merchantid: merchantId,
			amount: price,
			mobileNumber: phone_number,
			merchantname: merchantName,
			client_reference: reference
		});

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw
		};

		const url = PAY_MPESA_URL;
		const response = await fetch(url, requestOptions);
		console.log("🚀 ~ constPOST:RequestHandler= ~ response:", response)

		if (response.headers.get('Content-Type')?.includes('application/json')) {
			const info = await response.json();
			return json(info);
		} else {
			const mpesaTextData = await response.text();
			console.debug('🚀 ~ mpesaTextData:', mpesaTextData);
			return json(
				{ message: 'Response not in json' },
				{ status: 500, statusText: 'Response not in json' }
			);
		}
	} catch (error: unknown) {
		console.error('Error in /api/mpesa/pay', error);
		return json({ message: 'something went wrong', error }, { status: 500 });
	}
};
