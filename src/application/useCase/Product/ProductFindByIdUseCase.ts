import { Product } from "@entities/Product";
import ProductRepository from "../../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class ProductFindByIdUseCase extends AbstractUseCase {

	constructor(readonly productRepository: ProductRepository) {
		super(productRepository);
	}

	public async execute(id: number): Promise<Product | null> {
		const product = await this.productRepository.findById(id);

		if (!product) {
			this.setError({ message: 'Product not found!' });
		}

		return product;
	}
}