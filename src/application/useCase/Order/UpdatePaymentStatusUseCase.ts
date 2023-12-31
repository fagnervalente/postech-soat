import { Order, OrderPaymentStatus } from "@entities/Order";
import IOrderRepository from "@ports/IOrderRepository";
import PaymentStatusGateway from "@ports/gateway/IPaymentStatusGateway";
import AbstractUseCase from "../AbstractUseCase";

export default class UpdatePaymentStatysUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderRepository) {
		super(orderRepository);
	}

	async execute(orderId: number, paymentStatusGateway: PaymentStatusGateway): Promise<Order | null> {
        const status = await paymentStatusGateway.getStatus();

		this.validateOrder(orderId);
        this.validateStatus(status);
		
		if (this.hasErrors()) return null;

        const order = await this.orderRepository.findById(orderId);
        order!.paymentStatus = status!;

        return await this.orderRepository.save(order!);
	}

	private async validateOrder(id: number) {
		const found = await this.orderRepository.findById(id);
		if (!found) this.setError({ message: "Order not found" });
	}

	private async validateStatus(status: OrderPaymentStatus | null) {
		if (status === null) this.setError({ message: "Invalid payment status" });
	}
}