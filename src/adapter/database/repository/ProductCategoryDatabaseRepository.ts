import { ProductCategory } from "@entities/ProductCategory";
import { AppDataSource } from "../data-source";
import IProductCategoryRepository from "@ports/IProductCategoryRepository";
import { ProductCategoryModel } from "../models/ProductCategoryModel";

export default class ProductCategoryDatabaseRepository implements IProductCategoryRepository {

	productCategoryRepository = AppDataSource.getRepository(ProductCategoryModel);

	async save(category: ProductCategory): Promise<ProductCategory> {
		const newProductCategory = this.productCategoryRepository.create(ProductCategoryDatabaseRepository.mapDataEntityToModel(category));
		const savedProductCategory = await this.productCategoryRepository.save(newProductCategory);
		return ProductCategoryDatabaseRepository.mapDataModelToEntity(savedProductCategory);
	}

	async findById(id: number): Promise<ProductCategory | null> {
		const result = await this.productCategoryRepository.findOneBy({ id });
		if (!result) {
			return null;
		}
		return ProductCategoryDatabaseRepository.mapDataModelToEntity(result!);
	}

	async list(): Promise<ProductCategory[] | null> {
		const productCategoryModelList = await this.productCategoryRepository.find();
		
		if (!productCategoryModelList) {
			return null;
		}
		
		return productCategoryModelList.map(m => ProductCategoryDatabaseRepository.mapDataModelToEntity(m));
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