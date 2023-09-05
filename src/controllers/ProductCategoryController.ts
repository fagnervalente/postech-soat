import { ProductCategory } from "@entities/ProductCategory";
import IProductCategoryRepository from '@ports/IProductCategoryRepository';
import ProductCategoryCreateUseCase from "@useCases/ProductCategory/ProductCategoryCreateUseCase";
import ProductCategoryDeleteUseCase from "@useCases/ProductCategory/ProductCategoryDeleteUseCase";
import ProductCategoryFindByIdUseCase from "@useCases/ProductCategory/ProductCategoryFindByIdUseCase";
import ProductCategoryFindCategoryUseCase from "@useCases/ProductCategory/ProductCategoryListUseCase";
import ProductCategoryUpdateUseCase from "@useCases/ProductCategory/ProductCategoryUpdateUseCase";

export default class ProductCategoryController {

	static async create(
		name: string,
		productCategoryRepository: IProductCategoryRepository
	): Promise<ProductCategory | null> {

		const productCategory = new ProductCategory(undefined, name);
		const productCreated = new ProductCategoryCreateUseCase(productCategoryRepository);
		const newProductCategory = await productCreated.execute(productCategory);

		if (productCreated.hasErrors()) {
			Promise.reject(productCreated.getErrors());
		}

		return Promise.resolve(newProductCategory);
	}

	static async update(
		id: number,
		name: string,
		productCategoryRepository: IProductCategoryRepository
	): Promise<void> {

		const productCategory = new ProductCategory(id, name);
		const productCategoryUpdate = new ProductCategoryUpdateUseCase(productCategoryRepository);
		await productCategoryUpdate.execute(productCategory);

		if (productCategoryUpdate.hasErrors()) {
			Promise.reject(productCategoryUpdate.getErrors());
		}

		return Promise.resolve();
	}

	static async getById(
		id: number,
		productCategoryRepository: IProductCategoryRepository
	): Promise<ProductCategory | null> {

		const productFindById = new ProductCategoryFindByIdUseCase(productCategoryRepository);
		const productCategory = await productFindById.execute(id)
		
		if (productFindById.hasErrors()) {
			Promise.reject(productFindById.getErrors());
		}
		
		return Promise.resolve(productCategory);
	}

	static async list(
		productCategoryRepository: IProductCategoryRepository
	): Promise<ProductCategory[] | null> {

		const productCategoryFind = new ProductCategoryFindCategoryUseCase(productCategoryRepository);
		const productCategoryList = await productCategoryFind.execute();
		
		if (productCategoryFind.hasErrors()) {
			Promise.reject(productCategoryFind.getErrors());
		}

		return Promise.resolve(productCategoryList);
	}

	static async delete(
		id: number,
		productCategoryRepository: IProductCategoryRepository
	): Promise<void> {

		const productCategoryDelete = new ProductCategoryDeleteUseCase(productCategoryRepository);
		await productCategoryDelete.execute(id);
		
		if (productCategoryDelete.hasErrors()) {
			Promise.reject(productCategoryDelete.getErrors());
		}

		return Promise.resolve();
	}

	//countProductReferences
}