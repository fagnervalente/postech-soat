import { ProductCategory } from "@entities/ProductCategory";
import { AppDataSource } from "../database/data-source";
import ProductCategoryRepository from "../../ports/ProductCategoryRepository";
import { ProductCategoryModel } from "../database/models/ProductCategoryModel";

export default class ProductCategoryDatabaseRepository implements ProductCategoryRepository {

	productCategoryRepository = AppDataSource.getRepository(ProductCategoryModel);

	async save(category: ProductCategory): Promise<ProductCategory> {
		const newProductCategory = this.productCategoryRepository.create(ProductCategoryDatabaseRepository.mapDataEntityToModel(category));
		return ProductCategoryDatabaseRepository.mapDataModelToEntity(await this.productCategoryRepository.save(newProductCategory));
	}

	async findById(id: number): Promise<ProductCategory | null> {
		const result = await this.productCategoryRepository.findOneBy({ id });
		return result != null ? ProductCategoryDatabaseRepository.mapDataModelToEntity(result!) : Promise.resolve(null);
	}

	async list(): Promise<ProductCategory[] | null> {
		return await this.productCategoryRepository.find();
	}

	async delete(id: number): Promise<void> {
		await this.productCategoryRepository.delete(id);
	}

	async update(category: ProductCategory): Promise<void> {
		const categoryId = Number(category.id);
		this.productCategoryRepository.update(categoryId, category);
	}

	async countProductReferences(categoryId: number): Promise<number> {
		const category = await this.productCategoryRepository.findOne({ where: { id: categoryId }, relations: ['products'] });
		return category?.products?.length || 0;
	}

	static mapDataModelToEntity(model: ProductCategoryModel): ProductCategory {
		return new ProductCategory(model.id, model.name);
	}

	static mapDataEntityToModel(entity: ProductCategory): ProductCategoryModel {
		return new ProductCategoryModel(entity.id, entity.name);
	}
}