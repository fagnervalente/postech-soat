import OrderCalculator from "../../../domain/OrderCalculator";
import { Order } from "../../../entities/Order";
import OrderRepository from "../../repository/OrderRepository";

export default class OrderCreator {

  constructor(readonly orderRepository: OrderRepository) { }

  async execute(order: Order): Promise<Order> {
    order.totalPrice = OrderCalculator.calculate(order.products);
    return await this.orderRepository.save(order);
  }
}