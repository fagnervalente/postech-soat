
import { ProductCategory } from "@entities/ProductCategory";
import ProductCategoryRepository from "@ports/IProductCategoryRepository";
import AbstractUseCase from "@useCases/AbstractUseCase";

export default class ProductCategoryFindByIdUseCase extends AbstractUseCase {

	constructor(readonly productCategoryRepository: ProductCategoryRepository) {
		super(productCategoryRepository);
	}

	async execute(id: number): Promise<ProductCategory | null> {
		const productCategory = await this.productCategoryRepository.findById(id);

		if (!productCategory) {
			this.setError({ message: 'Product category not found!' });
		}

		return productCategory;
	}
}