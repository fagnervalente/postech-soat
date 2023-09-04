import { AppDataSource } from "../data-source";
import IOrderRepository from "@ports/IOrderRepository";
import { Order, OrderStatus } from "../../../domain/models/Order";
import { Not } from "typeorm";

export default class OrderDatabaseRepository implements IOrderRepository {

	orderRepository = AppDataSource.getRepository(Order);

	async save(order: Order): Promise<Order> {
		const newOrder = this.orderRepository.create(order);
		return await this.orderRepository.save(newOrder);
	}

	list(): Promise<Order[]> {
		return this.orderRepository.find({
			relations: ["products", "customer"],
			where: [{
				status: Not(OrderStatus.FINALIZADO)
			}],
			order: {
				status: "DESC",
				id: "DESC",
			},
		});
	}

	async update(order: Order): Promise<void> {
		const orderId = Number(order.id);
		await this.orderRepository.update(orderId, order);
		return;
	}


	async findById(id: number): Promise<Order | null> {
		return await this.orderRepository.findOneBy({ id });
	}

}