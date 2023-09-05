import { OrderPaymentStatus } from "@entities/Order";

export default interface IPaymentStatusGateway {
	getStatus(): Promise<OrderPaymentStatus | null>;
}