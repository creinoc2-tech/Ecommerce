export interface ICartItem {
	variantId: string;
	productId: string;
	name: string;
	color: string;
	storage: string;
	price: number;
	quantity: number;
	image: string;
}

export interface Props {
	item: ICartItem;
}
