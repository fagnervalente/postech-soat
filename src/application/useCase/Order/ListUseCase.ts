import { Order } from "../../../domain/models/Order";
import OrderRepository from "../../../ports/OrderRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class ListUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: OrderRepository) {
		super(orderRepository);
	}

	async execute(): Promise<Order[] | null> {
		return await this.orderRepository.list();
	}
}