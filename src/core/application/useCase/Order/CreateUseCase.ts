import { Order } from "../../../../database/entities/Order";
import OrderDomain from "../../../domain/Order/Order";
import OrderRepository from "../../ports/OrderRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class CreateUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: OrderRepository) {
		super(orderRepository);
	}

	async execute(order: Order): Promise<Order> {
		order.totalPrice = OrderDomain.calculateTotalPrice(order.products);
		return await this.orderRepository.save(order);
	}
}