import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return text("Hello /api/ecocash/pay");
};

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json();
    console.log(data)
    return new Response();
};