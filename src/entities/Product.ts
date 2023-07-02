import { Column, Entity, JoinColumn, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./ProductCategory";
import { Order } from "./Order";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  price: number;

  @ManyToOne(() => ProductCategory, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory

  @ManyToMany(() => Order, order => order.products)
  orders?: Order[]
}