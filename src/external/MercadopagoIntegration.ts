import fetch from 'node-fetch';
import IPaymentAPIIntegration from "../ports/PaymentAPI/IPaymentAPIIntegration";

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

export default class MercadopagoIntegration implements IPaymentAPIIntegration{
    _paymentId: number;

    constructor(webhookNotification: any){
        this._paymentId = Number( webhookNotification.data?.id );
    }

    async getPayment(): Promise<any> {
        try {
            const url = `https://api.mercadopago.com/v1/payments/${this._paymentId}`;
            const headers = {
              Authorization: `Bearer ${accessToken}`,
            };
      
            const response = await fetch(url, { headers });
      
            if (!response.ok) {
              console.log(`Erro ao consultar pagamento: ${response.statusText}`);
              return null;
            }
      
            const payment = await response.json();
            return payment;

          } catch (error) {
            console.log(`Erro ao consultar pagamento`, error);
            return null;
          }
    }

}