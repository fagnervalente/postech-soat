import { Request, Response } from "express";
import ProductCategoryDatabaseRepository from "../../repository/ProductCategoryDatabaseRepository";
import CreateUseCase from "../../../core/application/useCase/ProductCategory/CreateUseCase";

const productCategoryRepository = new ProductCategoryDatabaseRepository();

export class ProductCategoryController {

  async create(req: Request, res: Response) {
    const { name } = req.body;

	const createUseCase = new CreateUseCase(productCategoryRepository);
	const result = await createUseCase.execute({name});

	return res.status(201).json(result);
  }
}