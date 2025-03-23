import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VAPID_PUBLIC_KEY } from '$env/static/private';

export const GET: RequestHandler = async () => {
	const data = VAPID_PUBLIC_KEY;
	return json({ data });
};
