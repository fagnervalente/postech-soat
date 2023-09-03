import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductModel } from './ProductModel';
import { CustomerModel } from './CustomerModel';

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
export class OrderModel {
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

  @ManyToMany(() => ProductModel, product => product.orders)
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
  products?: ProductModel[];

  @ManyToOne(() => CustomerModel, customer => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer?: CustomerModel;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  totalPrice?: number;

	constructor(id: number | undefined, status: OrderStatus | undefined, paymentStatus: OrderPaymentStatus | undefined, products: ProductModel[] | undefined, customer: CustomerModel | undefined, totalPrice: number | undefined) {
		this.id = id;
		this.status = status;
		this.paymentStatus = paymentStatus;
		this.products = products;
		this.customer = customer;
		this.totalPrice = totalPrice;
	}
}