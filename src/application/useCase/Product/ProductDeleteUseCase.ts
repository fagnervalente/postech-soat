import IProductRepository from "@ports/IProductRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class ProductDeleteUseCase extends AbstractUseCase {

	constructor(readonly productRepository: IProductRepository) {
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