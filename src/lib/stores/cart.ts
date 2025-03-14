import { browser } from '$app/environment';
import type { buyProduct } from '$lib/types';
import { writable } from 'svelte/store';

export const cart = writable<buyProduct[]>([]);

if (browser) {
	let strCart = localStorage.getItem('cart');
	let myCart: buyProduct[];
	if (strCart == null) {
		localStorage.setItem('cart', '[]');
		myCart = [];
	} else {
		myCart = JSON.parse(strCart) as buyProduct[];
	}

	cart.set(myCart);
}

cart.subscribe((cart) => {
	if (browser) {
		let str = JSON.stringify(cart);
		localStorage.setItem('cart', str);
	}
});

export const addCart = (item: buyProduct) => {
	cart.update((cart) => {
		if (cart.some((c) => c.id == item.id))
			// if item already in cart
			return cart;

		return [...cart, item];
	});
};

export const removeCartItem = (id: number) => {
	cart.update((c) => c.filter((value) => value.id != id));
};

export const clearStore = (owners: string) => {
	cart.update((c) => c.filter((value) => value.owners != owners));
};
