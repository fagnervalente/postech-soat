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

export default class PaymentStatusGatewayWebhookMercadopago implements PaymentStatusGateway{
    private _paymentAPIIntegration: PaymentAPIIntegration;
    private _webhookNotification: any;

    constructor(paymentAPIIntegration: PaymentAPIIntegration, webhookNotification: any){
        this._paymentAPIIntegration = paymentAPIIntegration;
        this._webhookNotification = webhookNotification;
    }

    async getStatus(): Promise<OrderPaymentStatus | null> {
        const paymentData = await this._paymentAPIIntegration.getPaymentFromWebhookNotification(this._webhookNotification);
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