import { Product } from "@entities/Product";
import IProductRepository from "@ports/IProductRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class ProductFindByIdUseCase extends AbstractUseCase {

	constructor(readonly productRepository: IProductRepository) {
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