import { Order, OrderPaymentStatus } from "../../../domain/models/Order";
import OrderRepository from "../../../ports/OrderRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class GetOrderPaymentStatus extends AbstractUseCase {

	constructor(readonly orderRepository: OrderRepository) {
		super(orderRepository);
	}

	async execute(orderId: number): Promise<OrderPaymentStatus | null> {
		const order = await this.orderRepository.findById(orderId);
        
        if(!order) this.setError({message: "Order not found"});
        
        return order?.paymentStatus || null;
	}
}