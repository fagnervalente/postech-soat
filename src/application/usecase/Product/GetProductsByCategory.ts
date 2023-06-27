import { Product } from "../../../entities/Product";
import { ProductCategory } from "../../../entities/ProductCategory";
import ProductRepository from "../../repository/ProductRepository";

export default class GetProductsByCategory {

  constructor(readonly productRepository: ProductRepository) { }

  async execute(category: ProductCategory): Promise<Product[]> {
    return await this.productRepository.listByCategory(category);
  }
}