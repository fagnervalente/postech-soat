import { Request, Response } from "express";
import CategoryCreator from "../application/usecase/ProductCategory/CategoryCreator";
import { ProductCategory } from "../entities/ProductCategory";
import ProductCategoryDatabaseRepository from "../infra/repository/ProductCategoryDatabaseRepository";

const productCategoryRepository = new ProductCategoryDatabaseRepository();

export class ProductCategoryController {

  async create(req: Request, res: Response) {
    const { name } = req.body;
    const productCategory: ProductCategory = {
      name
    }

    try {
      const categoryCreator = new CategoryCreator(productCategoryRepository);
      const result = await categoryCreator.execute(productCategory);
      return res.status(201).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}