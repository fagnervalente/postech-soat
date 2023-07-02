import { Request, Response } from "express";
import OrderDatabaseRepository from "../infra/repository/OrderDatabaseRepository";
import OrderCreator from "../application/usecase/Order/OrderCreator";
import { Order, OrderPaymentStatus } from "../entities/Order";
import FindCustomerByCPF from "../application/usecase/Customer/FindCustomerByCPF";
import CustomerDatabaseRepository from "../infra/repository/CustomerDatabaseRepository";
import FindProductById from "../application/usecase/Product/FindProductById";
import ProductDatabaseRepository from "../infra/repository/ProductDatabaseRepository";
import { Product } from "../entities/Product";

const orderRepository = new OrderDatabaseRepository();
const customerRepository = new CustomerDatabaseRepository();
const productRepository = new ProductDatabaseRepository();

export default class OrderController {

  async checkout(req: Request, res: Response) {
    const { products, cpf } = req.body;

    try {
      const order: Order = {};

      if (cpf) {
        const getCustomer = new FindCustomerByCPF(customerRepository);
        const customer = await getCustomer.execute(cpf);

        if (!customer) {
          return res.status(404).json({ message: 'Customer not found!' });
        }

        order.customer = customer;
      }

      const getProduct = new FindProductById(productRepository);
      let productsFound: Product[] = []
      for (const id of products) {
        const product = await getProduct.execute(Number(id));
        if (!product) {
          return res.status(404).json({ message: 'Product not found!' });
        }
        productsFound.push(product!);
      }

      order.products = productsFound;

      // checkout mockado
      order.paymentStatus = OrderPaymentStatus.APROVADO;

      const orderCreator = new OrderCreator(orderRepository);
      const result = await orderCreator.execute(order);

      return res.status(201).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}