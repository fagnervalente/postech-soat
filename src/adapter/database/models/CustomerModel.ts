import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderModel } from './OrderModel';

@Entity('customers')
export class CustomerModel {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ type: 'text', nullable: false })
	name: string;

	@Column({ type: 'text', unique: true, nullable: false })
	cpf: string;

	@Column({ type: 'text', nullable: false })
	email: string;

	@OneToMany(() => OrderModel, order => order.customer)
	orders?: OrderModel[]
}