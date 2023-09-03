import { Column, Entity, JoinColumn, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategoryModel } from "./ProductCategoryModel";
import { OrderModel } from "./OrderModel";

@Entity('products')
export class ProductModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  price: number;

  @ManyToOne(() => ProductCategoryModel, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategoryModel

  @ManyToMany(() => OrderModel, order => order.products)
  orders?: OrderModel[]
}