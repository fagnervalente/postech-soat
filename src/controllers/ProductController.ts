import { Request, Response } from "express";
import ProductDatabaseRepository from '../infra/repository/ProductDatabaseRepository';
import { Product } from '../entities/Product';
import FindCategory from '../application/usecase/ProductCategory/FindCategory';
import ProductCategoryDatabaseRepository from '../infra/repository/ProductCategoryDatabaseRepository';
import ProductCreator from '../application/usecase/Product/ProductCreator';
import GetProductsByCategory from "../application/usecase/Product/GetProductsByCategory";

const productRepository = new ProductDatabaseRepository();
const productCategoryRepository = new ProductCategoryDatabaseRepository();

export class ProductController {

  async create(req: Request, res: Response) {
    const { name, description, price } = req.body;
    const { categoryId } = req.params;

    try {
      const findCategory = new FindCategory(productCategoryRepository);
      const category = await findCategory.execute(Number(categoryId));

      if (!category) {
        return res.status(404).json({ message: 'Category not found!' });
      }

      const product: Product = {
        name,
        description,
        price,
        category
      }

      const productCreator = new ProductCreator(productRepository);
      const result = await productCreator.execute(product);
      return res.status(201).json(result);
    } catch (error: any) {
      if (error.code == "23502") {
        return res.status(400).json({ message: error.detail })
      }
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getByCategory(req: Request, res: Response) {
    const { categoryId } = req.params;

    try {
      const findCategory = new FindCategory(productCategoryRepository);
      const category = await findCategory.execute(Number(categoryId));

      if (!category) {
        return res.status(404).json({ message: 'Category not found!' });
      }

      const getProductsByCategory = new GetProductsByCategory(productRepository);
      const result = await getProductsByCategory.execute(category);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.code == "23502") {
        return res.status(400).json({ message: error.detail })
      }
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}