import { writable } from 'svelte/store';

export const user = writable<{
	id: number;
	name: string;
	phone_number: string;
}>();
