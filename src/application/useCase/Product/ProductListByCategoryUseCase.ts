import { Product } from "@entities/Product";
import ProductCategoryRepository from "../../../ports/ProductCategoryRepository";
import ProductRepository from "../../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";
import CategoryFindByIdUseCase from '../ProductCategory/ProductCategoryFindByIdUseCase';
import { ProductCategory } from "@entities/ProductCategory";

export default class ProductListByCategoryUseCase extends AbstractUseCase {
	private productCategoryRepository: ProductCategoryRepository;

	constructor(readonly repository: ProductRepository, productCategoryRepository: ProductCategoryRepository) {
		super(repository);
		this.productCategoryRepository = productCategoryRepository;
	}

	public async execute(categoryId: number): Promise<Product[] | null> {
		const findCategory = new CategoryFindByIdUseCase(this.productCategoryRepository);
		const category = await findCategory.execute(Number(categoryId)) as ProductCategory;

		if (findCategory.hasErrors()) {
			this.setErrors(findCategory.getErrors());
			return null;
		}

		const products = await this.repository.listByCategory(category);

		if (!products) {
			this.setError({ message: 'Products not found for informed category!' });
		}

		return products;
	}
}