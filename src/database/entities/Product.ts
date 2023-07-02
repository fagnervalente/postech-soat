import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import IProduct from "../../core/domain/Product/IProduct";

@Entity('products')
export class Product implements IProduct {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ type: 'text', nullable: false })
	name: string;

	@Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
	price: number;
}