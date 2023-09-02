import CustomerRepository from "../../../src/ports/CustomerRepository";
import { Customer } from "../../../src/domain/models/Customer";

export default class CustomerInMemoryRepository implements CustomerRepository {
	public customers: Customer[] = [];

	public async list(): Promise<Customer[] | null> {
		return await this.customers;
	}

	public async save(customer: Customer): Promise<Customer> {
		const created = { ...customer, id: Math.floor(Math.random() * Date.now()) };
		this.customers.push(created);

		return created;
	}

	public async findByCPF(cpf: string): Promise<Customer | null> {
		const customer = this.customers.find((customer) => customer.cpf == cpf) ?? null;

		return customer;
	}

	public async delete(id: number): Promise<void> {
		this.customers = this.customers.filter((customer) => {
			return customer.id != id;
		});
	}
}