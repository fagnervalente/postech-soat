import { Order } from "../../../../database/entities/Order";
import OrderDomain from "../../../domain/Order/Order";
import OrderRepository from "../../ports/OrderRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class UpdateUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: OrderRepository) {
		super(orderRepository);
	}

	async execute(order: Order): Promise<void> {
		if (order.products) {
			order.totalPrice = OrderDomain.calculateTotalPrice(order.products);
		}
		return await this.orderRepository.update(order);
	}

}