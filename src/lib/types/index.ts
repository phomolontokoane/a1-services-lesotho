export type Product = {
	created_at: string | null;
	id: number;
	img: string[];
	isfeatured: boolean | null;
	name: string;
	owners: string;
	price: number;
	qty: number;
};

export interface buyProduct extends Product {
	avaliableQty: number;
} // in this case qty would be the number of wanted

export type Store = {
	contacts: string;
	created_at: string;
	id: number;
	image: string | null;
	name: string;
	owners: string;
};

export type buyPostData = {
	phone_number: string;
	merchantName: string;
	merchantId: string;
	price: string;
	reference: string;
};

export type apiBuyPostData = {
	merchantid: string;
	amount: string;
	mobileNumber: string;
	merchantname: string;
	client_reference: string;
};
