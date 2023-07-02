import { Product } from "../../../entities/Product";
import ProductRepository from "../../repository/ProductRepository";

export default class FindProductById {

  constructor(readonly productRepository: ProductRepository) { }

  async execute(id: number): Promise<Product | null> {
    return await this.productRepository.findOne(id);
  }
}