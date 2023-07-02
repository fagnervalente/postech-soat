import { ProductCategory } from "../../../entities/ProductCategory";
import ProductCategoryRespository from "../../repository/ProductCategoryRepository";

export default class CategoryCreator {

  constructor(readonly productCategoryRepository: ProductCategoryRespository) { }

  async execute(productCategory: ProductCategory): Promise<ProductCategory> {
    return await this.productCategoryRepository.save(productCategory);
  }
}