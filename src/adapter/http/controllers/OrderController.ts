import { Request, Response } from "express";
import { Order } from "../../../domain/models/Order";
import OrderDatabaseRepository from "../../repository/OrderDatabaseRepository";
import CustomerDatabaseRepository from "../../repository/CustomerDatabaseRepository";
import ProductDatabaseRepository from "../../repository/ProductDatabaseRepository";
import CreateUseCase from "../../../application/useCase/Order/CreateUseCase";
import ListUseCase from "../../../application/useCase/Order/ListUseCase";

const orderRepository = new OrderDatabaseRepository();
const customerRepository = new CustomerDatabaseRepository();
const productRepository = new ProductDatabaseRepository();

export default class OrderController {

	async checkout(req: Request, res: Response) {
		// #swagger.tags = ['Order']
		// #swagger.description = 'Endpoint para realizar o checkout.'
		/* #swagger.parameters['checkout'] = {
				in: 'body',
				description: 'Informações do pedido para checkout.',
				required: true,
				schema: { $ref: "#/definitions/Checkout" }
		} */
		const { products, cpf } = req.body;

		const createUseCase = new CreateUseCase(orderRepository, customerRepository, productRepository);
		const result = await createUseCase.execute({ products, customer: { cpf: cpf } } as Order);

		if (createUseCase.hasErrors()) {
			return res.status(400).json(createUseCase.getErrors());
		}

		/* #swagger.responses[201] = { 
			schema: { $ref: "#/definitions/Order" },
			description: 'Pedito criado' 
		} */
		return res.status(201).json(result);
	}

	async list(req: Request, res: Response) {
		// #swagger.tags = ['Order']
		// #swagger.description = 'Endpoint para listar todos os pedidos.'
		const listOrder = new ListUseCase(orderRepository);
		const result = await listOrder.execute();

		/* #swagger.responses[200] = { 
			schema: { $ref: "#/definitions/ListOrders" },
			description: 'Pedidos encontrados' 
		} */
		return res.status(200).json(result);
	}
}