import { Product } from "../models/Product";

export default class Calculator {
	public static calculateOrderTotalPrice(products: Product[] | undefined): number {
		let total = 0;
		for (const product of products!) {
			total += parseFloat(product.price.toString());
		}

		return total;
	}
}