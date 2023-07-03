import { Customer } from "../../../database/entities/Customer";

export default interface CustomerRepository {
	save(customer: Customer): Promise<Customer>;
	findByCPF(cpf: string): Promise<Customer | null>;
}