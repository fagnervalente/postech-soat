import { OrderPaymentStatus } from "../../domain/models/Order";

export default interface PaymentAPIIntegration{
    getPayment(): Promise<any>;
}