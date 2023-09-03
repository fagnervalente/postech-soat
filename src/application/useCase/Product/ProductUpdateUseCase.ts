import ProductRepository from "@ports/ProductRepository";
import AbstractUseCase from "../AbstractUseCase";
import schema from "../../validation/updateProduct";
import ProductCategoryFindByIdUseCase from "../ProductCategory/ProductCategoryFindByIdUseCase";
import ProductCategoryRepository from "@ports/IProductCategoryRepository";
import ProductFindByIdUseCase from "./ProductFindByIdUseCase";
import { Product } from "@entities/Product";
import { ProductCategory } from "@entities/ProductCategory";

export type ProductUpdateBody = {
	id?: number;
	name: string;
	description: string;
	price: number;
	categoryId: number;
};

export class ProductUpdateUseCase extends AbstractUseCase {
	private productCategoryRepository: ProductCategoryRepository;

	constructor(readonly productRepository: ProductRepository, productCategoryRepository: ProductCategoryRepository) {
		super(productRepository);
		this.productCategoryRepository = productCategoryRepository;
	}

	public async execute(body: ProductUpdateBody): Promise<void> {
		this.validateFields(body);
		let product = await this.validateProduct(body.id!);
		let category = await this.validateCategory(body.categoryId);
		if (this.hasErrors()) return;

		product = {
			id: product?.id,
			name: body.name,
			description: body.description,
			price: body.price,
			category: category!
		};
		await this.productRepository.update(product);
	}


	private async validateFields(product: ProductUpdateBody): Promise<void> {
		this.validateSchema(schema, product);
	}

	private async validateCategory(id: number): Promise<ProductCategory | null> {
		const findCategory = new ProductCategoryFindByIdUseCase(this.productCategoryRepository);
		const category = await findCategory.execute(id);

		if (findCategory.hasErrors()) {
			this.setErrors(findCategory.getErrors());
		}

		return category;
	}

	private async validateProduct(id: number): Promise<Product | null> {
		const findProduct = new ProductFindByIdUseCase(this.productRepository);
		const product = await findProduct.execute(id);

		if (findProduct.hasErrors()) {
			this.setErrors(findProduct.getErrors());
		}

		return product;
	}

}