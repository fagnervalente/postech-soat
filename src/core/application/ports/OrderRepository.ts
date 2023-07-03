import { Order } from "../../../database/entities/Order";

export default interface OrderRepository {
	save(order: Order): Promise<Order>;
	list(): Promise<Order[]>;
}