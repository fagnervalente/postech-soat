import { Product } from "../../../../database/entities/Product";
import { ProductCategory } from "../../../../database/entities/ProductCategory";
import ProductRepository from "../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class ListByCategoryUseCase extends AbstractUseCase {

	constructor(readonly productRepository: ProductRepository) {
		super(productRepository);
	}

	async execute(category: ProductCategory): Promise<Product[]> {
		const products = await this.productRepository.listByCategory(category);

		if (!products) {
			this.setError({ message: 'Products not found for informed category!' });
		}

		return products;
	}
}