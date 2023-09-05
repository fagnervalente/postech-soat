import { OrderPaymentStatus } from '../../../src/domain/entities/Order';
import IPaymentStatusGateway from '../../../src/ports/gateway/IPaymentStatusGateway';

export default class MockedPaymentStatusGateway implements IPaymentStatusGateway{
    readonly mockedStatus: OrderPaymentStatus;

    constructor(mockedStatus: OrderPaymentStatus){
        this.mockedStatus = mockedStatus;
    }

    getStatus(): Promise<OrderPaymentStatus> {
        return Promise.resolve(this.mockedStatus);
    }

}