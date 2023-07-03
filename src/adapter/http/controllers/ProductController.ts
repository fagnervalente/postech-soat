import { NextFunction, Request, Response } from "express";
import CategoryFindByIdUseCase from "../../../core/application/useCase/ProductCategory/FindById";
import ProductCategoryDatabaseRepository from "../../repository/ProductCategoryDatabaseRepository";
import ProductDatabaseRepository from "../../repository/ProductDatabaseRepository";
import CreateUseCase from "../../../core/application/useCase/Product/CreateUseCase";
import ListByCategoryUseCase from "../../../core/application/useCase/Product/ListByCategoryUseCase";
import { ProductCategory } from "../../../database/entities/ProductCategory";

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

		const createUseCase = new CreateUseCase(productRepository);
		const result = await createUseCase.execute({ name, description, price, category });

		return res.status(201).json(result);
	}

	async getByCategory(req: Request, res: Response) {
		const { categoryId } = req.params;

		const findCategory = new CategoryFindByIdUseCase(productCategoryRepository);
		const category = await findCategory.execute(Number(categoryId)) as ProductCategory;

		if (findCategory.hasErrors()) {
			return res.status(400).json(findCategory.getErrors());
		}

		const listByCategoryUseCase = new ListByCategoryUseCase(productRepository);
		const result = await listByCategoryUseCase.execute(category);

		if (listByCategoryUseCase.hasErrors()) {
			return res.status(400).json(listByCategoryUseCase.getErrors());
		}

		return res.status(200).json(result);
	}
}