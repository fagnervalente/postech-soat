import { Product } from "../../../../database/entities/Product";
import ProductRepository from "../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";
import schema from "../../validation/updateProduct";

export default class ProductUpdateUseCase extends AbstractUseCase{

	constructor(readonly productRepository: ProductRepository) {
		super(productRepository);
	}

	public async execute(product: Product): Promise<void> {
		this.validateFields(product);
		if (this.hasErrors()) return;

		await this.productRepository.update(product);
	}

		
	private async validateFields(product: Product): Promise<void> {
		this.validateSchema(schema, product);
	}
}