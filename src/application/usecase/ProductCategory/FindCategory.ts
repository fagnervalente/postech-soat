import { ProductCategory } from "../../../entities/ProductCategory";
import ProductCategoryRespository from "../../repository/ProductCategoryRepository";

export default class FindCategory {

  constructor(readonly productCategoryRepository: ProductCategoryRespository) { }

  async execute(id: number): Promise<ProductCategory | null> {
    return await this.productCategoryRepository.findById(id);
  }
}