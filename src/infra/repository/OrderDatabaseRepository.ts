import OrderRepository from "../../application/repository/OrderRepository";
import { AppDataSource } from "../../data-source";
import { Order } from "../../entities/Order";

export default class OrderDatabaseRepository implements OrderRepository {

  orderRepository = AppDataSource.getRepository(Order);

  async save(order: Order): Promise<Order> {
    const newOrder = this.orderRepository.create(order);
    return await this.orderRepository.save(newOrder);
  }

  list(): Promise<Order[]> {
    return this.orderRepository.find();
  }

}