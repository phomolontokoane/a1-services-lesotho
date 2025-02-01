import { writable } from 'svelte/store';

export const user = writable({ id: -1, name: '', phone_number: '' });
