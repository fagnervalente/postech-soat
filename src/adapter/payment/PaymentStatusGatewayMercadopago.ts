import { OrderPaymentStatus } from "@database/models/OrderModel";
import PaymentAPIIntegration from "@ports/PaymentAPI/IPaymentAPIIntegration";
import PaymentStatusGateway from "@ports/gateway/IPaymentStatusGateway";

const STATUS_APROVED = 'approved';

enum StatusMercadopago {
    PENDING = 'pending',
    APPROVED = 'approved',
    AUTHORIZED = 'authorized',
    IN_PROCESS = 'in_process',
    IN_MEDIATION = 'in_mediation',
    REJECTED = 'rejected',
    CANCELLED = 'cancelled',
    REFUNDED = 'refunded',
    CHARGED_BACK = 'charged_back',
  }

export default class PaymentStatusGatewayMercadopago implements PaymentStatusGateway{
    private _paymentAPIIntegration: PaymentAPIIntegration;

    constructor(paymentAPIIntegration: PaymentAPIIntegration){
        this._paymentAPIIntegration = paymentAPIIntegration;
    }

    async getStatus(): Promise<OrderPaymentStatus | null> {
        const paymentData = await this._paymentAPIIntegration.getPayment();
        switch(paymentData.status){
            case StatusMercadopago.PENDING:
            case StatusMercadopago.AUTHORIZED:
            case StatusMercadopago.IN_PROCESS:
            case StatusMercadopago.IN_MEDIATION:
            case StatusMercadopago.REJECTED:
                return OrderPaymentStatus.AGUARDANDO;
                
            case StatusMercadopago.APPROVED:
                return OrderPaymentStatus.APROVADO;
            
            case StatusMercadopago.CANCELLED:
            case StatusMercadopago.REFUNDED:
            case StatusMercadopago.CHARGED_BACK:
                return OrderPaymentStatus.RECUSADO;
        }
        return null;
    }
}