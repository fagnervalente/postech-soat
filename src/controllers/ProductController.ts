import ProductCreateUseCase from "@useCases/Product/ProductCreateUseCase";
import ProductListByCategoryUseCase from "@useCases/Product/ProductListByCategoryUseCase";
import ProductDeleteUseCase from "@useCases/Product/ProductDeleteUseCase";
import ProductFindByIdUseCase from "@useCases/Product/ProductFindByIdUseCase";
import { ProductUpdateBody, ProductUpdateUseCase } from '@useCases/Product/ProductUpdateUseCase';
import ProductRepository from "@ports/IProductRepository";
import ProductCategoryRepository from "@ports/IProductCategoryRepository";
import { Product } from "@entities/Product";
import { ProductCategory } from "@entities/ProductCategory";

export class ProductController {
	static async create(name: string, description: string, price: number, categoryId: number, productRepository: ProductRepository, categoryRepository: ProductCategoryRepository): Promise<Product | null> {
		const productCreate = new ProductCreateUseCase(productRepository, categoryRepository);
		const result = await productCreate.execute({
			name,
			description,
			price,
			category: {
				id: categoryId
			} as ProductCategory
		});

		if (productCreate.hasErrors()) throw productCreate.getErrors();

		return result;
	}

	static async getById(productId: number, productRepository: ProductRepository): Promise<Product | null> {
		const productFindById = new ProductFindByIdUseCase(productRepository);
		const result = await productFindById.execute(productId);

		if (productFindById.hasErrors()) throw productFindById.getErrors();

		return result;
	}

	static async getByCategory(categoryId: number, productRepository: ProductRepository, categoryRepository: ProductCategoryRepository): Promise<Product[] | null> {
		const productListByCategory = new ProductListByCategoryUseCase(productRepository, categoryRepository);
		const result = await productListByCategory.execute(categoryId);

		if (productListByCategory.hasErrors()) throw productListByCategory.getErrors();

		return result;
	}

	static async update(productId: number, name: string, description: string, price: number, categoryId: number, productRepository: ProductRepository, categoryRepository: ProductCategoryRepository): Promise<void> {
		const productUpdate = new ProductUpdateUseCase(productRepository, categoryRepository);
		const result = await productUpdate.execute(<ProductUpdateBody>{ id: productId, name, description, price, categoryId });

		if (productUpdate.hasErrors()) throw productUpdate.getErrors();

		return result;
	}

	static async delete(productId: number, productRepository: ProductRepository): Promise<void | null> {
		const productDelete = new ProductDeleteUseCase(productRepository);
		const result = productDelete.execute(productId);

		if (productDelete.hasErrors()) throw productDelete.getErrors();

		return result;
	}
}