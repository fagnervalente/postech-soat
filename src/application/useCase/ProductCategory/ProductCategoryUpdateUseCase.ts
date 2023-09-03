import ProductCategoryRepository from "@ports/IProductCategoryRepository";
import AbstractUseCase from "@useCases/AbstractUseCase";
import schema from "@validation/updateProductCategory";
import { ProductCategory } from "@entities/ProductCategory";
import ProductCategoryFindByIdUseCase from "@useCases/ProductCategory/ProductCategoryFindByIdUseCase";

export default class ProductCategoryUpdateUseCase extends AbstractUseCase {

	constructor(readonly productCategoryRepository: ProductCategoryRepository) {
		super(productCategoryRepository);
	}

	public async execute(category: ProductCategory): Promise<void> {
		this.validateFields(category);
		this.validateProductCategory(category.id!);
		if (this.hasErrors()) return;

		await this.productCategoryRepository.update(category);
	}

	private async validateFields(category: ProductCategory): Promise<void> {
		this.validateSchema(schema, category);
	}

	private async validateProductCategory(id: number): Promise<ProductCategory | null> {
		const findCategory = new ProductCategoryFindByIdUseCase(this.productCategoryRepository);
		const category = await findCategory.execute(id);

		if (findCategory.hasErrors()) {
			this.setErrors(findCategory.getErrors());
		}

		return category;
	}
}