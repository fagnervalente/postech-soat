import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Customer } from './Customer';

export enum OrderStatus {
  RECEBIDO = "Recebido",
  EM_PREPARACAO = "Em preparação",
  PRONTO = "Pronto",
  FINALIZADO = "Finalizado"
}

export enum OrderPaymentStatus {
  APROVADO = "Aprovado",
  RECUSADO = "Recusado",
  AGUARDANDO = "Aguardando pagamento"
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.RECEBIDO
  })
  status?: OrderStatus;

  @Column({
    type: "enum",
    enum: OrderPaymentStatus,
    default: OrderPaymentStatus.AGUARDANDO
  })
  paymentStatus?: OrderPaymentStatus;

  @ManyToMany(() => Product, product => product.orders)
  @JoinTable({
    name: 'product_order',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'order_id',
      referencedColumnName: 'id'
    }
  })
  products?: Product[];

  @ManyToOne(() => Customer, customer => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer?: Customer;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  totalPrice?: number;
}