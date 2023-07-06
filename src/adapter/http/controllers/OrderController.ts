import { Request, Response } from "express";
import { Order, OrderPaymentStatus } from "../../../database/entities/Order";
import CustomerFindByCPFUseCase from "../../../core/application/useCase/Customer/FindByCPFUseCase";
import ProductFindByIdUseCase from "../../../core/application/useCase/Product/FindByIdUseCase";
import OrderDatabaseRepository from "../../repository/OrderDatabaseRepository";
import CustomerDatabaseRepository from "../../repository/CustomerDatabaseRepository";
import ProductDatabaseRepository from "../../repository/ProductDatabaseRepository";
import { Product } from "../../../database/entities/Product";
import CreateUseCase from "../../../core/application/useCase/Order/CreateUseCase";
import { Customer } from "../../../database/entities/Customer";
import ListUseCase from "../../../core/application/useCase/Order/ListUseCase";

const orderRepository = new OrderDatabaseRepository();
const customerRepository = new CustomerDatabaseRepository();
const productRepository = new ProductDatabaseRepository();

export default class OrderController {

	async checkout(req: Request, res: Response) {
		const { products, cpf } = req.body;
		const order: Order = {};

		if (cpf) {
			const getCustomer = new CustomerFindByCPFUseCase(customerRepository);
			const customer = await getCustomer.execute(cpf) as Customer;

			if (getCustomer.hasErrors()) {
				return res.status(400).json(getCustomer.getErrors());
			}

			order.customer = customer;
		}

		const getProduct = new ProductFindByIdUseCase(productRepository);
		let productsFound: Product[] = []
		for (const id of products) {
			const product = await getProduct.execute(Number(id));
			if (getProduct.hasErrors()) {
				return res.status(400).json(getProduct.getErrors());
			}
			productsFound.push(product!);
		}

		order.products = productsFound;

		// checkout mockado
		order.paymentStatus = OrderPaymentStatus.APROVADO;

		const createUseCase = new CreateUseCase(orderRepository);
		const result = await createUseCase.execute(order);

		return res.status(201).json(result);
	}

	async list(req: Request, res: Response) {
		try {
		  const listOrder = new ListUseCase(orderRepository);
		  const result = await listOrder.execute();
		  return res.status(201).json(result);
		} catch (error) {
		  console.log(error);
		  return res.status(500).json({ message: 'Internal Server Error' });
		}
	}
}