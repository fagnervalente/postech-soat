import { Product } from "../entities/Product";

export default class OrderCalculator {
  static calculate(products: Product[] | undefined): number {
    let total = 0;
    for (const product of products!) {
      total += product.price;
    }

    return total;
  }
}