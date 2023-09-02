import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity('productCategories')
export class ProductCategory {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ type: 'text' })
	name: string;

	@OneToMany(() => Product, product => product.category)
	products?: Product[]
}