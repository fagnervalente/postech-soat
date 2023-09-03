import { OrderPaymentStatus } from "../../domain/models/Order";

export default interface PaymentStatusGateway {
	getStatus(): Promise<OrderPaymentStatus | null>;
}