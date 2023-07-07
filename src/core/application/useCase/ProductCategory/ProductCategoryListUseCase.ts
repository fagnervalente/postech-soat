
import { ProductCategory } from "../../../../database/entities/ProductCategory";
import ProductCategoryRepository from "../../ports/ProductCategoryRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class ProductCategoryFindCategoryUseCase extends AbstractUseCase {

	constructor(readonly productCategoryRepository: ProductCategoryRepository) {
		super(productCategoryRepository);
	}

	async execute(): Promise<ProductCategory[] | null> {
		return await this.productCategoryRepository.list();
	}
}