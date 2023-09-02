import { Order } from "../domain/models/Order";

export default interface OrderRepository {
	save(order: Order): Promise<Order | null>;
	list(): Promise<Order[]>;
	update(order: Order): Promise<void>;
	findById(id: number): Promise<Order | null>
}