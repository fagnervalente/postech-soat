import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductModel } from "./ProductModel";

@Entity('productCategories')
export class ProductCategoryModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => ProductModel, product => product.category)
  products?: ProductModel[]

	constructor(id: number | undefined, name: string) {
		this.id = id;
		this.name = name;
	}
}