import { Product } from "../../../../database/entities/Product";
import ProductCategoryRepository from "../../ports/ProductCategoryRepository";
import AbstractUseCase from "../AbstractUseCase";
import schema from "../../validation/updateProductCategory";
import { ProductCategory } from "../../../../database/entities/ProductCategory";

export default class ProductCategoryUpdateUseCase extends AbstractUseCase{

	constructor(readonly productCategoryRepository: ProductCategoryRepository) {
		super(productCategoryRepository);
	}

	public async execute(category: ProductCategory): Promise<void> {
		this.validateFields(category);
		if (this.hasErrors()) return;

		await this.productCategoryRepository.update(category);
	}

		
	private async validateFields(category: ProductCategory): Promise<void> {
		this.validateSchema(schema, category);
	}
}