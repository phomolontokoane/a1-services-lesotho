import type { buyProduct } from '$lib/types';
import { writable } from 'svelte/store';

export const cart = writable<buyProduct[]>([]);
