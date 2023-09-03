import { ProductCategory } from "./ProductCategory";

export class Product {
	readonly id?: number;
	readonly name: string;
	readonly description: string;
	readonly price: number;
	readonly category: ProductCategory;

	constructor(id: number | undefined, name: string, desc: string, price: number, category: ProductCategory) {
		this.id = id;
		this.name = name;
		this.description = desc;
		this.price = price;
		this.category = category;
	}
}