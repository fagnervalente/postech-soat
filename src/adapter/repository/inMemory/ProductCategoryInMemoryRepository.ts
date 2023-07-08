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
		const found = this.categories.find((a) => a.id == id) ?? null;
		return found;
	}

	public async list(): Promise<ProductCategory[]> {
		return [...this.categories];
	}

	public async delete(id: number): Promise<void> {
		this.categories = this.categories.filter((category) => {
			return category.id != id;
		});
	}

	public async update(category: ProductCategory): Promise<void> {
		this.categories.map((c) => {
			if (c.id == category.id) {
				c.name = category.name;
			}
		});
	}

	public async countProductReferences(categoryId: number): Promise<number> {
		return await this.categories.find((category) => category.id == categoryId)?.products?.length || 0;
	}
}