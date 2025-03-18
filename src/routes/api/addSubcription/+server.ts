import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib';

export const POST: RequestHandler = async ({locals, request}) => {
    const { user } = locals;
    const { subscription } = await request.json();

    if (!user) {
        return text('Unauthorized', { status: 401 });
    }

    // Check if user exists
    const {data, error} = (await supabase.from('User').select('*').eq('id', user.id));
    if (error) {
        console.error(error);
        return text('Error', { status: 500 });
    } else if (data.length === 0) {
        return text('User not found', { status: 404 });
    }

    // Check if subscription exists
    return new Response();
};