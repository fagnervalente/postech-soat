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
	orders?: OrderModel[];

	constructor(id: number | undefined, name: string, cpf: string, email: string, orders: OrderModel[] | undefined) {
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.email = email;
		this.orders = orders;
	}
}