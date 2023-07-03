import { Order } from "../../../entities/Order";
import OrderRepository from "../../repository/OrderRepository";

export default class ListOrder {

  constructor(readonly orderRepository: OrderRepository) { }

  async execute(): Promise<Order[] | null> {
    return await this.orderRepository.list();
  }
}