import type { Store } from '$lib/types';
import { writable } from 'svelte/store';

export let store = writable<Store>();
