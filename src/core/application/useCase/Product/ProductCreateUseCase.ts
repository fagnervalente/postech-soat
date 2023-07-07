import { Product } from "../../../../database/entities/Product";
import ProductRepository from "../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";
import schema from "../../validation/createProduct";

export default class ProductCreateUseCase extends AbstractUseCase{

	constructor(readonly productRepository: ProductRepository) {
		super(productRepository);
	}

	public async execute(product: Product): Promise<Product | null> {
		this.validateFields(product);
		if (this.hasErrors()) return null;

		return await this.productRepository.save(product);
	}

	
	private async validateFields(product: Product): Promise<void> {
		this.validateSchema(schema, product);
	}
}