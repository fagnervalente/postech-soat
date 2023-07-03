import { ProductCategory } from "../../../../database/entities/ProductCategory";
import ProductCategoryRespository from "../../ports/ProductCategoryRepository";

export default class CreateUseCase {

	constructor(readonly productCategoryRepository: ProductCategoryRespository) { }

	async execute(productCategory: ProductCategory): Promise<ProductCategory> {
		return await this.productCategoryRepository.save(productCategory);
	}
}