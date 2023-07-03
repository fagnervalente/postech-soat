import { Product } from "../../../../database/entities/Product";
import ProductRepository from "../../ports/ProductRepository";

export default class CreateUseCase {

	constructor(readonly productRepository: ProductRepository) { }

	async execute(product: Product): Promise<Product> {
		return await this.productRepository.save(product);
	}
}