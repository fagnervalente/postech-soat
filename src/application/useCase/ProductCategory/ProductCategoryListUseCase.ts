
import { ProductCategory } from "@entities/ProductCategory";
import ProductCategoryRepository from "@ports/IProductCategoryRepository";
import AbstractUseCase from "@useCases/AbstractUseCase";

export default class ProductCategoryFindCategoryUseCase extends AbstractUseCase {

	constructor(readonly productCategoryRepository: ProductCategoryRepository) {
		super(productCategoryRepository);
	}

	async execute(): Promise<ProductCategory[] | null> {
		return await this.productCategoryRepository.list();
	}
}