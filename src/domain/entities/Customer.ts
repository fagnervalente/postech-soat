import { Order } from './Order';

export class Customer {
	id?: number;
	name: string;
	cpf: string;
	email: string;
	orders?: Order[]
}