import ProductCategoryRespository from "../../../core/application/ports/ProductCategoryRepository";
import { ProductCategory } from "../../../database/entities/ProductCategory";

export default class ProductCategoryInMemoryRepository implements ProductCategoryRespository {
	public categories: ProductCategory[] = [];

	public async save(category: ProductCategory): Promise<ProductCategory> {
		const created = {
			...category,
			id: category.id ? category.id : Math.floor(Math.random() * Date.now())
		};
		this.categories.push(created);

		return created;
	}

	public async findById(id: number): Promise<ProductCategory | null> {
		const finded = this.categories.find((category) => category.id == id) ?? null;

		return finded;
	}

}