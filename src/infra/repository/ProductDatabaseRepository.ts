import ProductRepository from "../../application/repository/ProductRepository";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/Product";
import { ProductCategory } from "../../entities/ProductCategory";

export default class ProductDatabaseRepository implements ProductRepository {

  productRepository = AppDataSource.getRepository(Product);

  async save(product: Product): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id });
  }

  update(Product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async listByCategory(category: ProductCategory): Promise<Product[]> {
    return await this.productRepository.findBy({ category })
  }

}