import { Product } from "../domain/models/Product";
import { ProductCategory } from "../domain/models/ProductCategory";

export default interface ProductRepository {
	save(product: Product): Promise<Product>;
	findById(id: number): Promise<Product | null>;
	update(product: Product): Promise<void>;
	delete(id: number): Promise<void>;
	listByCategory(category: ProductCategory): Promise<Product[]>;
}