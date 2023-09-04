import { Order } from "../domain/models/Order";
import CreateUseCase from "../application/useCase/Order/CreateUseCase";
import ListUseCase from "../application/useCase/Order/ListUseCase";
import UpdatePaymentStatusUseCase from "../application/useCase/Order/UpdatePaymentStatusUseCase";
import IOrderRepository from "../ports/IOrderRepository";
import IPaymentStatusGateway from "../ports/gateway/IPaymentStatusGateway";
import { Product } from "../domain/models/Product";
import ICustomerRepository from "../ports/ICustomerRepository";
import IProductRepository from "../ports/IProductRepository";
import GetOrderPaymentStatus from "../application/useCase/Order/GetOrderPaymentStatus";



export default class OrderController {
    static async checkout(products: Array<number | Product>, cpf: string, orderRepository: IOrderRepository, customerRepository: ICustomerRepository, productRepository: IProductRepository) {
		const createUseCase = new CreateUseCase(orderRepository, customerRepository, productRepository);
		const result = await createUseCase.execute({ products, customer: { cpf: cpf } } as Order);

		if(createUseCase.hasErrors()) Promise.reject(createUseCase.getErrors());

		return result;
	}

	static async list(orderRepository: IOrderRepository) {
		const listOrder = new ListUseCase(orderRepository);
		const result = await listOrder.execute();

		if(listOrder.hasErrors()) Promise.reject(listOrder.getErrors());

		return result;
	}
	
	static async handlePaymentWebhook(orderId: number, paymentStatusGateway: IPaymentStatusGateway, orderRepository: IOrderRepository){
		const updatePaymentStatus = new UpdatePaymentStatusUseCase(orderRepository);
		
		await updatePaymentStatus.execute(orderId, paymentStatusGateway);

		if(updatePaymentStatus.hasErrors()) Promise.reject(updatePaymentStatus.getErrors());
	}

	static async getPaymentStatus(orderId: number, orderRepository: IOrderRepository){
		const getPaymentStatus = new GetOrderPaymentStatus(orderRepository);
		const result = await getPaymentStatus.execute(orderId);

		if(getPaymentStatus.hasErrors()) Promise.reject(getPaymentStatus.getErrors());

		return result;
	}
}