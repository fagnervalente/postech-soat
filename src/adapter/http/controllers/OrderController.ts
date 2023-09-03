import { Order } from "../../../domain/models/Order";
import CreateUseCase from "../../../application/useCase/Order/CreateUseCase";
import ListUseCase from "../../../application/useCase/Order/ListUseCase";
import UpdatePaymentStatusUseCase from "../../../application/useCase/Order/UpdatePaymentStatusUseCase";
import OrderRepository from "../../../ports/OrderRepository";
import PaymentStatusGateway from "../../../ports/gateway/PaymentStatusGateway";
import { Product } from "../../../domain/models/Product";
import CustomerRepository from "../../../ports/CustomerRepository";
import ProductRepository from "../../../ports/ProductRepository";
import GetOrderPaymentStatus from "../../../application/useCase/Order/GetOrderPaymentStatus";



export default class OrderController {
    static async checkout(products: Array<number | Product>, cpf: string, orderRepository: OrderRepository, customerRepository: CustomerRepository, productRepository: ProductRepository) {
		const createUseCase = new CreateUseCase(orderRepository, customerRepository, productRepository);
		const result = await createUseCase.execute({ products, customer: { cpf: cpf } } as Order);

		if(createUseCase.hasErrors()) Promise.reject(createUseCase.getErrors());

		return result;
	}

	static async list(orderRepository: OrderRepository) {
		const listOrder = new ListUseCase(orderRepository);
		const result = await listOrder.execute();

		if(listOrder.hasErrors()) Promise.reject(listOrder.getErrors());

		return result;
	}
	
	static async handlePaymentWebhook(orderId: number, paymentStatusGateway: PaymentStatusGateway, orderRepository: OrderRepository){
		const updatePaymentStatus = new UpdatePaymentStatusUseCase(orderRepository);
		
		await updatePaymentStatus.execute(orderId, paymentStatusGateway);

		if(updatePaymentStatus.hasErrors()) Promise.reject(updatePaymentStatus.getErrors());
	}

	static async getPaymentStatus(orderId: number, orderRepository: OrderRepository){
		const getPaymentStatus = new GetOrderPaymentStatus(orderRepository);
		const result = await getPaymentStatus.execute(orderId);

		if(getPaymentStatus.hasErrors()) Promise.reject(getPaymentStatus.getErrors());

		return result;
	}
}