import { Request, Response } from "express";
import ProductCategoryDatabaseRepository from "../../repository/ProductCategoryDatabaseRepository";
import ProductCategoryCreateUseCase from "../../../core/application/useCase/ProductCategory/ProductCategoryCreateUseCase";
import ProductCategoryFindByIdUseCase from "../../../core/application/useCase/ProductCategory/ProductCategoryFindByIdUseCase";
import ProductCategoryUpdateUseCase from "../../../core/application/useCase/ProductCategory/ProductCategoryUpdateUseCase";
import ProductCategoryDeleteUseCase from "../../../core/application/useCase/ProductCategory/ProductCategoryDeleteUseCase";
import ProductDatabaseRepository from "../../repository/ProductDatabaseRepository";
import ProductListByCategoryUseCase from "../../../core/application/useCase/Product/ProductListByCategoryUseCase";
import ProductCategoryListUseCase from "../../../core/application/useCase/ProductCategory/ProductCategoryListUseCase";

const productCategoryRepository = new ProductCategoryDatabaseRepository();

export class ProductCategoryController {

  async create(req: Request, res: Response) {
    const { name } = req.body;

    const createUseCase = new ProductCategoryCreateUseCase(productCategoryRepository);
    const result = await createUseCase.execute({name});

    return res.status(201).json(result);
  }

  async getById(req: Request, res: Response){
		const { id } = req.params;

		const categoryFindById = new ProductCategoryFindByIdUseCase(productCategoryRepository);
		const result = await categoryFindById.execute(Number(id));

		if (categoryFindById.hasErrors()) {
			return res.status(400).json(categoryFindById.getErrors());
		}

		return res.status(200).json(result);
	}

  async list(req: Request, res: Response){
		const listCategories = new ProductCategoryListUseCase(productCategoryRepository);
		const result = await listCategories.execute();

		if (listCategories.hasErrors()) {
			return res.status(400).json(listCategories.getErrors());
		}

		return res.status(200).json(result);
	}

  
	async update(req: Request, res: Response): Promise<Response> {
		const { name } = req.body;
		const { id } = req.params;

		const categoryUpdate = new ProductCategoryUpdateUseCase(productCategoryRepository);
		const result = await categoryUpdate.execute({ id: Number(id), name });

		if (categoryUpdate.hasErrors()) {
			return res.status(400).json(categoryUpdate.getErrors());
		}

		return res.status(201).json(result);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		
    const categoryDelete = new ProductCategoryDeleteUseCase(productCategoryRepository);
		categoryDelete.execute(Number(id));

		if (categoryDelete.hasErrors()) {
			return res.status(400).json(categoryDelete.getErrors());
		}

		return res.status(200).json();
	}
}