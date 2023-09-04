export default interface IPaymentAPIIntegration{
    getPayment(): Promise<any>;
}