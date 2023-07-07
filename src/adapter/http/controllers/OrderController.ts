import { Request, Response } from "express";
import { Order, OrderPaymentStatus } from "../../../database/entities/Order";
import CustomerFindByCPFUseCase from "../../../core/application/useCase/Customer/FindByCPFUseCase";
import ProductFindByIdUseCase from "../../../core/application/useCase/Product/ProductFindByIdUseCase";
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

		const createUseCase = new CreateUseCase(orderRepository, customerRepository, productRepository);
		const result = await createUseCase.execute({ products, customer: { cpf: cpf } } as Order);

		if (createUseCase.hasErrors()) {
			return res.status(400).json(createUseCase.getErrors());
		}

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