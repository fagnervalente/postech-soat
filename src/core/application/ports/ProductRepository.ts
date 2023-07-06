import { Product } from "../../../database/entities/Product";
import { ProductCategory } from "../../../database/entities/ProductCategory";

export default interface ProductRepository {
	save(product: Product): Promise<Product>;
	findById(id: number): Promise<Product | null>;
	update(product: Product): Promise<void>;
	delete(id: number): Promise<void>;
	listByCategory(category: ProductCategory): Promise<Product[]>;
}