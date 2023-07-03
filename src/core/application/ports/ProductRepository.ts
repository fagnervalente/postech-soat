import { Product } from "../../../database/entities/Product";
import { ProductCategory } from "../../../database/entities/ProductCategory";

export default interface ProductRepository {
	save(product: Product): Promise<Product>;
	findOne(id: number): Promise<Product | null>;
	update(Product: Product): Promise<Product>;
	delete(): Promise<void>;
	listByCategory(category: ProductCategory): Promise<Product[]>;
}