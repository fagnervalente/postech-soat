import { NextFunction, Request, Response } from "express";
import CategoryFindByIdUseCase from "../../../core/application/useCase/ProductCategory/FindById";
import ProductCategoryDatabaseRepository from "../../repository/ProductCategoryDatabaseRepository";
import ProductDatabaseRepository from "../../repository/ProductDatabaseRepository";
import CreateUseCase from "../../../core/application/useCase/Product/CreateUseCase";
import ListByCategoryUseCase from "../../../core/application/useCase/Product/ListByCategoryUseCase";
import { ProductCategory } from "../../../database/entities/ProductCategory";
import DeleteUseCase from "../../../core/application/useCase/Product/DeleteUseCase";
import FindByIdUseCase from "../../../core/application/useCase/Product/FindByIdUseCase";
import { Product } from "../../../database/entities/Product";
import UpdateUseCase from "../../../core/application/useCase/Product/UpdateUseCase";

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

	async getById(req: Request, res: Response) {
		const { id } = req.params;

		const findByIdUseCase = new FindByIdUseCase(productRepository);
		const result = await findByIdUseCase.execute(Number(id));

		if (findByIdUseCase.hasErrors()) {
			return res.status(400).json(findByIdUseCase.getErrors());
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

		const listByCategoryUseCase = new ListByCategoryUseCase(productRepository);
		const result = await listByCategoryUseCase.execute(category);

		if (listByCategoryUseCase.hasErrors()) {
			return res.status(400).json(listByCategoryUseCase.getErrors());
		}

		return res.status(200).json(result);
	}

	async update(req: Request, res: Response): Promise<Response> {
		const { name, description, price, category} = req.body;
		const { id } = req.params;

		const updateUseCase = new UpdateUseCase(productRepository);
		const result = await updateUseCase.execute({ id: Number(id), name, description, price, category });

		if (updateUseCase.hasErrors()) {
			return res.status(400).json(updateUseCase.getErrors());
		}

		return res.status(201).json(result);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		
		const productId = Number(id);
		const deleteUseCase = new DeleteUseCase(productRepository);
		deleteUseCase.execute(productId);

		if (deleteUseCase.hasErrors()) {
			return res.status(400).json(deleteUseCase.getErrors());
		}

		return res.status(200).json();
	}
}