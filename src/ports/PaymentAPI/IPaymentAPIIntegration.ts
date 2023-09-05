export default interface IPaymentAPIIntegration{
    getPaymentFromWebhookNotification(webhookNotification:any): Promise<any>;
}