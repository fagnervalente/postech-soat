import { Order } from "../../../../database/entities/Order";
import OrderRepository from "../../ports/OrderRepository";

export default class ListUseCase {

	constructor(readonly orderRepository: OrderRepository) { }

	async execute(): Promise<Order[] | null> {
		return await this.orderRepository.list();
	}
}