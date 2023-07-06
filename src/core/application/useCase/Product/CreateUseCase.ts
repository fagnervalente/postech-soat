import { Product } from "../../../../database/entities/Product";
import ProductRepository from "../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class CreateUseCase extends AbstractUseCase{

	constructor(readonly productRepository: ProductRepository) {
		super(productRepository);
	}

	public async execute(product: Product): Promise<Product> {
		return await this.productRepository.save(product);
	}
}