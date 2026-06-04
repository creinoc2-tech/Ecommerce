export interface OrderInput {
	address: {
		addressLine1: string;
		addressLine2?: string;
		city: string;
		state: string;
		postalCode?: string;
		country: string;
	};
	cartItems: {
		variantId: string;
		quantity: number;
		price: number;
	}[];
	totalAmount: number;
}

export interface OrderItemSingle {
	created_at: string;
	id: number;
	status: string;
	total_amount: number;
}

export interface OrderItem {
	quantity: number;
	price: number;
	variants?: {
		color_name?: string;
		storage?: string;
		products?: {
			name?: string;
			images?: string[];
		};
	};
}

export interface CreatedOrder {
	id: number;
}


export interface OrderWithCustomer {
	id: number;
	status: string;
	total_amount: number;
	created_at: string;
	 usuario: {
		full_name: string;
		email: string;
	} | null;
}