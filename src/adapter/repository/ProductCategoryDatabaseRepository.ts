import { AppDataSource } from "../../data-source";
import ProductCategoryRepository from "../../core/application/ports/ProductCategoryRepository";
import { ProductCategory } from "../../database/entities/ProductCategory";

export default class ProductCategoryDatabaseRepository implements ProductCategoryRepository {

  productCategoryRepository = AppDataSource.getRepository(ProductCategory);

  async save(category: ProductCategory): Promise<ProductCategory> {
    const newProductCategory = this.productCategoryRepository.create(category);
    return await this.productCategoryRepository.save(newProductCategory);
  }

  async findById(id: number): Promise<ProductCategory | null> {
    return await this.productCategoryRepository.findOneBy({ id });
  }

  async list(): Promise<ProductCategory[] | null> {
    return await this.productCategoryRepository.find();
  }

  async delete(id: number): Promise<void> {
    await this.productCategoryRepository.delete(id);
  }

  async update(category: ProductCategory): Promise<void> {
    const categoryId = Number(category.id);
    this.productCategoryRepository.update(categoryId, category);
  }

  async countProductReferences(categoryId: number): Promise<number> {
    const category = await this.productCategoryRepository.findOne({ where:  {id: categoryId }, relations: ['products']  });
    return category?.products?.length || 0;
  }
}