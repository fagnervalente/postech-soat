
import { ProductCategory } from "../../../../database/entities/ProductCategory";
import ProductCategoryRespository from "../../ports/ProductCategoryRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class FindCategory extends AbstractUseCase {

	constructor(readonly productCategoryRepository: ProductCategoryRespository) {
		super(productCategoryRepository);
	}

	async execute(id: number): Promise<ProductCategory | null> {
		const productCategory = await this.productCategoryRepository.findById(id);

		if (!productCategory) {
			this.setError({ message: 'Product category not found!' });
		}

		return productCategory;
	}
}