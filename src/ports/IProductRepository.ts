import { Product } from "@entities/Product";
import { ProductCategory } from "@entities/ProductCategory";

export default interface IProductRepository {
	save(product: Product): Promise<Product>;
	findById(id: number): Promise<Product | null>;
	update(product: Product): Promise<void>;
	delete(id: number): Promise<void>;
	listByCategory(category: ProductCategory): Promise<Product[]>;
}