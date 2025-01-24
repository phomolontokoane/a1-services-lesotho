import { z } from 'zod';

export const formSchema = z.object({
	phone_number: z.string().min(8),
	password: z.string().min(4)
});

export type FormSchema = typeof formSchema;
