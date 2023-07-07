import { ProductCategory } from "../../../../database/entities/ProductCategory";
import ProductCategoryRepository from "../../ports/ProductCategoryRepository";
import AbstractUseCase from "../AbstractUseCase";
import schema from "../../validation/createProductCategory";

export default class ProductCategoryCreateUseCase extends AbstractUseCase{

	constructor(readonly productCategoryRepository: ProductCategoryRepository) {
		super(productCategoryRepository);
	}

	async execute(productCategory: ProductCategory): Promise<ProductCategory | null> {
		this.validateFields(productCategory);
		if(this.hasErrors()) return null;

		return await this.productCategoryRepository.save(productCategory);
	}

	private async validateFields(productCategory: ProductCategory): Promise<void> {
		this.validateSchema(schema, productCategory);
	}
}