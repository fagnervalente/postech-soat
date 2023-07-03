import { Product } from "../../../../database/entities/Product";
import ProductRepository from "../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class FindByIdUseCase extends AbstractUseCase {

	constructor(readonly productRepository: ProductRepository) {
		super(productRepository);
	}

	async execute(id: number): Promise<Product | null> {
		const product = await this.productRepository.findOne(id);

		if (!product) {
			this.setError({ message: 'Product not found!' });
		}

		return product;
	}
}