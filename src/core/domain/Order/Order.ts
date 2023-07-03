import { Product } from "../../../database/entities/Product";

export default class Order {
	public static calculateTotalPrice(products: Product[] | undefined): number {
		let total = 0;
		for (const product of products!) {
			total += parseFloat(product.price.toString());
		}

		return total;
	}
}