import { AppDataSource } from "../../data-source";
import OrderRepository from "../../core/application/ports/OrderRepository";
import { Order } from "../../database/entities/Order";

export default class OrderDatabaseRepository implements OrderRepository {

	orderRepository = AppDataSource.getRepository(Order);

	async save(order: Order): Promise<Order> {
		const newOrder = this.orderRepository.create(order);
		return await this.orderRepository.save(newOrder);
	}

	list(): Promise<Order[]> {
		return this.orderRepository.find({ relations: ["products", "customer"] });
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