import { AppDataSource } from "../database/data-source";
import ProductRepository from "../../ports/ProductRepository";
import { Product } from "@entities/Product";
import { ProductCategory } from "@entities/ProductCategory";
import { ProductModel } from "../database/models/ProductModel";

export default class ProductDatabaseRepository implements ProductRepository {

	productRepository = AppDataSource.getRepository(ProductModel);

	async save(product: Product): Promise<Product> {
		const newProductModel = this.productRepository.create(ProductDatabaseRepository.mapDataEntityToModel(product));
		return ProductDatabaseRepository.mapDataModelToEntity(await this.productRepository.save(newProductModel))
	}

	async findById(id: number): Promise<Product | null> {
		const result = await this.productRepository.findOneBy({ id });
		return result != null ? ProductDatabaseRepository.mapDataModelToEntity(result!) : null;
	}

	async delete(id: number): Promise<void> {
		await this.productRepository.softDelete(id);
	}

	async update(product: Product): Promise<void> {
		const productId = Number(product.id);
		this.productRepository.update(productId, product);
	}

	async listByCategory(category: ProductCategory): Promise<Product[]> {
		return await this.productRepository.findBy({ category })
	}

	static mapDataModelToEntity(model: ProductModel): Product {
		return new Product(model.id, model.name, model.description, model.price, model.category);
	}

	static mapDataEntityToModel(entity: Product): ProductModel {
		return new ProductModel(entity.id, entity.name, entity.description, entity.price, entity.category);
	}

}