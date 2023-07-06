import { Order } from "../../../../database/entities/Order";
import OrderDomain from "../../../domain/Order/Order";
import OrderRepository from "../../ports/OrderRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class CreateUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: OrderRepository) {
		super(orderRepository);
	}

	async execute(order: Order): Promise<Order | null> {
		if (!order.products || order.products.length === 0) {
			this.setError({ message: "Order must have at least one product" });
		}
		if (this.hasErrors()) {
			return null;
		} 
		
		order.totalPrice = OrderDomain.calculateTotalPrice(order.products);
		return await this.orderRepository.save(order);
	}
}