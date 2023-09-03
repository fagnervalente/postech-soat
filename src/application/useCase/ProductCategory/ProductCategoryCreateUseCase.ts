import { ProductCategory } from "@entities/ProductCategory";

import AbstractUseCase from "@useCases/AbstractUseCase";
import schema from "@validation/createProductCategory";
import IProductCategoryRepository from "@ports/IProductCategoryRepository";

export default class ProductCategoryCreateUseCase extends AbstractUseCase {

	constructor(readonly productCategoryRepository: IProductCategoryRepository) {
		super(productCategoryRepository);
	}

	async execute(productCategory: ProductCategory): Promise<ProductCategory | null> {
		this.validateFields(productCategory);
		if (this.hasErrors()) return null;

		return await this.productCategoryRepository.save(productCategory);
	}

	private async validateFields(productCategory: ProductCategory): Promise<void> {
		this.validateSchema(schema, productCategory);
	}
}