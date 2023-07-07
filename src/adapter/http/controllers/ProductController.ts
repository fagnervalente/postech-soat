import { NextFunction, Request, Response } from "express";
import CategoryFindByIdUseCase from "../../../core/application/useCase/ProductCategory/ProductCategoryFindByIdUseCase";
import ProductCategoryDatabaseRepository from "../../repository/ProductCategoryDatabaseRepository";
import ProductDatabaseRepository from "../../repository/ProductDatabaseRepository";
import ProductCreateUseCase from "../../../core/application/useCase/Product/ProductCreateUseCase";
import ProductListByCategoryUseCase from "../../../core/application/useCase/Product/ProductListByCategoryUseCase";
import { ProductCategory } from "../../../database/entities/ProductCategory";
import ProductDeleteUseCase from "../../../core/application/useCase/Product/ProductDeleteUseCase";
import ProductFindByIdUseCase from "../../../core/application/useCase/Product/ProductFindByIdUseCase";
import { Product } from "../../../database/entities/Product";
import ProductUpdateUseCase from "../../../core/application/useCase/Product/ProductUpdateUseCase";

const productRepository = new ProductDatabaseRepository();
const productCategoryRepository = new ProductCategoryDatabaseRepository();

export class ProductController {

	async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const { name, description, price } = req.body;
		const { categoryId } = req.params;

		const findCategory = new CategoryFindByIdUseCase(productCategoryRepository);
		const category = await findCategory.execute(Number(categoryId)) as ProductCategory;

		if (findCategory.hasErrors()) {
			return res.status(400).json(findCategory.getErrors());
		}

		const productCreate = new ProductCreateUseCase(productRepository);
		const result = await productCreate.execute({ name, description, price, category });

		if(productCreate.hasErrors()){
			return res.status(400).json(productCreate.getErrors());
		}

		return res.status(201).json(result);
	}

	async getById(req: Request, res: Response) {
		const { id } = req.params;

		const productFindById = new ProductFindByIdUseCase(productRepository);
		const result = await productFindById.execute(Number(id));

		if (productFindById.hasErrors()) {
			return res.status(400).json(productFindById.getErrors());
		}

		return res.status(200).json(result);
	}


	async getByCategory(req: Request, res: Response) {
		const { categoryId } = req.params;

		const findCategory = new CategoryFindByIdUseCase(productCategoryRepository);
		const category = await findCategory.execute(Number(categoryId)) as ProductCategory;

		if (findCategory.hasErrors()) {
			return res.status(400).json(findCategory.getErrors());
		}

		const productListByCategory = new ProductListByCategoryUseCase(productRepository);
		const result = await productListByCategory.execute(category);

		if (productListByCategory.hasErrors()) {
			return res.status(400).json(productListByCategory.getErrors());
		}

		return res.status(200).json(result);
	}

	async update(req: Request, res: Response): Promise<Response> {
		const { name, description, price, category} = req.body;
		const { id } = req.params;

		const productUpdate = new ProductUpdateUseCase(productRepository);
		const result = await productUpdate.execute({ id: Number(id), name, description, price, category });

		if (productUpdate.hasErrors()) {
			return res.status(400).json(productUpdate.getErrors());
		}

		return res.status(201).json(result);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		
		const productId = Number(id);
		const productDelete = new ProductDeleteUseCase(productRepository);
		productDelete.execute(productId);

		if (productDelete.hasErrors()) {
			return res.status(400).json(productDelete.getErrors());
		}

		return res.status(200).json();
	}
}