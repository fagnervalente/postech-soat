import { Customer } from "../../../database/entities/Customer";

export default interface CustomerRepository {
	save(customer: Customer): Promise<Customer>;
	findByCPF(cpf: string): Promise<Customer | null>;
	delete(id: number): Promise<void>;
	list(): Promise<Customer[] | null>;
}