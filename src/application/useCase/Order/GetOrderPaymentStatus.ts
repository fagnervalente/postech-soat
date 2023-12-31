import { Order, OrderPaymentStatus } from "@entities/Order";
import IOrderRepository from "@ports/IOrderRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class GetOrderPaymentStatus extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderRepository) {
		super(orderRepository);
	}

	async execute(orderId: number): Promise<OrderPaymentStatus | null> {
		const order = await this.orderRepository.findById(orderId);
        
        if(!order) this.setError({message: "Order not found"});
        
        return order?.paymentStatus || null;
	}
}