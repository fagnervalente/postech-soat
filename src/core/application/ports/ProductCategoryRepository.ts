import { ProductCategory } from "../../../database/entities/ProductCategory";

export default interface ProductCategoryRepository {
	save(category: ProductCategory): Promise<ProductCategory>;
	findById(id: number): Promise<ProductCategory | null>;
	list(): Promise<ProductCategory[] | null>;
	delete(id: number): Promise<void>;
	update(category: ProductCategory): Promise<void>;
	countProductReferences(categoryId: number): Promise<number>;
}