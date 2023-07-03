import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', unique: true, nullable: false })
  cpf: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @OneToMany(() => Order, order => order.customer)
  orders?: Order[]
}