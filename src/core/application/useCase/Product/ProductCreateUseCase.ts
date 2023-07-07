import { Product } from "../../../../database/entities/Product";
import ProductRepository from "../../ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";
import schema from "../../validation/createProduct";
import ProductCategoryRepository from "../../ports/ProductCategoryRepository";
import CategoryFindByIdUseCase from '../ProductCategory/ProductCategoryFindByIdUseCase';
import { ProductCategory } from "../../../../database/entities/ProductCategory";

export default class ProductCreateUseCase extends AbstractUseCase{
	private productCategoryRepository: ProductCategoryRepository;

	constructor(readonly repository: ProductRepository, productCategoryRepository: ProductCategoryRepository) {
		super(repository);
		this.productCategoryRepository = productCategoryRepository;
	}

	public async execute(product: Product): Promise<Product | null> {
		this.validateFields(product);
		if (this.hasErrors()) {
			return null;
		}

		return await this.repository.save(product);
	}

	private async validateFields(product: Product): Promise<void> {
		await this.validateCategory(product);
		this.validateSchema(schema, product);
	}

	private async validateCategory(product: Product): Promise<void> {
		const category = product.category as ProductCategory;
		const findCategory = new CategoryFindByIdUseCase(this.productCategoryRepository);
		await findCategory.execute(Number(category.id)) as ProductCategory;

		if (findCategory.hasErrors()) {
			this.setErrors(findCategory.getErrors());
		}
	}
}