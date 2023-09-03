import { ProductCategory } from "./ProductCategory";
import { Order } from "./Order";

export class Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: ProductCategory
  orders?: Order[]
}