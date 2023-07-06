import { Product } from "../../../../database/entities/Product";
import ProductRepository from "../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class UpdateUseCase extends AbstractUseCase{

	constructor(readonly productRepository: ProductRepository) {
		super(productRepository);
	}

	public async execute(product: Product): Promise<Product> {
		const productId = Number(product.id);
		
		if(!productId){
			this.setError({message: '"id" is required'});
		}

		const preExistentProduct = await this.productRepository.findById(productId);

		if (!preExistentProduct) {
			this.setError({ message: 'Product not found!' });
		}

		return await this.productRepository.save(product);
	}
}