import { Product } from "../../../entities/Product";
import ProductRepository from "../../repository/ProductRepository";

export default class ProductCreator {

  constructor(readonly productRepository: ProductRepository) { }

  async execute(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }
}