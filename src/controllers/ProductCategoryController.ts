import { ProductCategory } from "@entities/ProductCategory";
import IProductCategoryRepository from '@ports/IProductCategoryRepository';
import ProductCategoryCreateUseCase from "@useCases/ProductCategory/ProductCategoryCreateUseCase";

export default class ProductCategoryController {

	static async create(
		name: string,
		productCategoryRepository: IProductCategoryRepository
	): Promise<ProductCategory | null> {

		const productCategory = new ProductCategory(undefined, name);
		const productCategoryUseCase = new ProductCategoryCreateUseCase(productCategoryRepository);
		const newProductCategory = await productCategoryUseCase.execute(productCategory);

		if (productCategoryUseCase.hasErrors()) {
			Promise.reject(productCategoryUseCase.getErrors());
		}

		return newProductCategory;
	}

}