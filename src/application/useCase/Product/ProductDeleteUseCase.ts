import ProductRepository from "../../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class ProductDeleteUseCase extends AbstractUseCase {

	constructor(readonly productRepository: ProductRepository) {
		super(productRepository);
	}

	public async execute(id: number | null): Promise<void | null> {
		if (!id) {
			this.setError({ message: '"id" is required' });
			return null;
		}
		return await this.productRepository.delete(id);
	}
}