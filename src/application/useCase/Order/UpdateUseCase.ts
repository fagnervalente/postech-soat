import { Order } from "@entities/Order";
import Calculator from "../../../domain/rules/Calculator";
import IOrderRepository from "@ports/IOrderRepository";
import AbstractUseCase from "../AbstractUseCase";
import schema from "../../validation/updateOrder";

export default class UpdateUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderRepository) {
		super(orderRepository);
	}

	async execute(order: Order): Promise<void> {
		this.validateFields(order);
		this.validateOrder(order.id!);
		if (this.hasErrors()) return;

		if (order.products) {
			order.totalPrice = Calculator.calculateOrderTotalPrice(order.products);
		}
		return await this.orderRepository.update(order);
	}

	private async validateFields(order: Order): Promise<void> {
		this.validateSchema(schema, order);
	}

	private async validateOrder(id: number) {
		const found = await this.orderRepository.findById(id);
		if (!found) this.setError({ message: "Order not found" });
	}
}