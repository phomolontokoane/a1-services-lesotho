import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PAY_MPESA_URL, PAY_LESOTHO_KEY } from '$env/static/private';

type PostData = {
	phone_number: string;
	merchantName: string;
	merchantId: string;
	price: string;
	orderId: string;
};

export const GET: RequestHandler = async () => {
	return text('Hello from /api/mpesa/pay');
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data: Partial<PostData> = await request.json();
		const { phone_number, merchantName, price, orderId, merchantId } = data;

		const dataMising =
			!phone_number || !merchantName || !price || !orderId || !merchantId;
		if (dataMising) {
			return text('One of the values is missing', {
				status: 400,
				statusText: 'One of the values is missing'
			});
		}
		const notFormat = isNaN(+phone_number) || isNaN(+price) || isNaN(+merchantId);
		if (notFormat) {
			return text('One of the values is not in the right format', {
				status: 400,
				statusText: 'One of the values is not in the right format'
			});
		}

		const headers = new Headers();
		headers.append('Authorization', `Bearer: $10$${PAY_LESOTHO_KEY}`);
		headers.append('Content-Type', 'application/json');

		const raw = JSON.stringify({
			merchantid: merchantId,
			amount: price,
			mobileNumber: phone_number,
			merchantname: merchantName,
			client_reference: `Payment for order #${orderId}`
		});

		const response = await fetch(PAY_MPESA_URL, {
			method: 'POST',
			headers: headers,
			body: raw,
			redirect: 'follow'
		});

		if (!response.ok) {
			console.error('Response not ok in /api/pay/mpesa: ', response);
			return text('Response Bad', { status: 500, statusText: 'Response Bad' });
		}

		const info: {
			status_code: string;
			message: string;
			reference?: string;
		} = await response.json();

		if (info.status_code == 'INS-0' && info.reference) {
			return json({ reference: info.reference });
		} else {
			return json(info, { statusText: 'Payment not successfull', status: 400 });
		}
	} catch (error) {
		console.error('Error in /api/pay/mpesa: ', error);
		return text('Something went wrong.', {
			status: 500,
			statusText: 'Something went wrong.'
		});
	}
};
