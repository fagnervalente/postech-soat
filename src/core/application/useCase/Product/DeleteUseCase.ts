import { Product } from "../../../../database/entities/Product";
import ProductRepository from "../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class DeleteUseCase extends AbstractUseCase{

	constructor(readonly productRepository: ProductRepository) {
		super(productRepository);
	}

	public async execute(id: number): Promise<void | null> {
		if (!id) {
			this.setError({message: '"id" is required'});
			return null;
		}
		return await this.productRepository.delete(id);
	}
}