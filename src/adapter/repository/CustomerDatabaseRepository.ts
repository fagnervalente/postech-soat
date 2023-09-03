import { AppDataSource } from "../database/data-source";
import CustomerRepository from "../../ports/CustomerRepository";
import { Customer } from "../../domain/models/Customer";

export default class CustomerDatabaseRepository implements CustomerRepository {

	customerRepository = AppDataSource.getRepository(Customer);

	async list(): Promise<Customer[] | null> {
		return await this.customerRepository.find();
	}

	async save(customer: Customer): Promise<Customer> {
		const newCustomer = this.customerRepository.create(customer);
		return await this.customerRepository.save(newCustomer);
	}

	async findByCPF(cpf: string): Promise<Customer | null> {
		const result = await this.customerRepository.findOneBy({ cpf });
		return result;
	}

	async delete(id: number): Promise<void> {
		await this.customerRepository.delete(id);
	}
}