import ProductCategoryRespository from "../../application/repository/ProductCategoryRepository";
import { AppDataSource } from "../../data-source";
import { ProductCategory } from "../../entities/ProductCategory";

export default class ProductCategoryDatabaseRepository implements ProductCategoryRespository {

  productCategoryRepository = AppDataSource.getRepository(ProductCategory);

  async save(category: ProductCategory): Promise<ProductCategory> {
    const newProductCategory = this.productCategoryRepository.create(category);
    return await this.productCategoryRepository.save(newProductCategory);
  }

  async findById(id: number): Promise<ProductCategory | null> {
    return await this.productCategoryRepository.findOneBy({ id });
  }

}