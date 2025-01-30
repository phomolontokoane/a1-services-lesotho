import type { Store } from '$lib/types';
import { writable } from 'svelte/store';

export const initialStore = {
	contacts: '',
	created_at: '',
	id: -1,
	image: null,
	name: '',
	owners: ''
};

export let store = writable<Store>(initialStore);
