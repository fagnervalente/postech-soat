import { AppDataSource } from "../database/data-source";
import CustomerRepository from "../../ports/CustomerRepository";
import { Customer } from "../../domain/entities/Customer";
import { CustomerModel } from "../database/models/CustomerModel";

export default class CustomerDatabaseRepository implements CustomerRepository {

	customerRepository = AppDataSource.getRepository(CustomerModel);

	async list(): Promise<Customer[] | null> {
		const customers = await this.customerRepository.find();

		if (customers) {
			return customers.map((model: CustomerModel) => {
				return CustomerDatabaseRepository.mapDataModelToEntity(model);
			});
		}

		return null;
	}

	async save(customer: Customer): Promise<Customer> {
		const newCustomer = this.customerRepository.create(CustomerDatabaseRepository.mapDataEntityToModel(customer));
		const created = await this.customerRepository.save(newCustomer);

		return CustomerDatabaseRepository.mapDataModelToEntity(created);
	}

	async findByCPF(cpf: string): Promise<Customer | null> {
		const result = await this.customerRepository.findOneBy({ cpf });

		if (result) {
			return CustomerDatabaseRepository.mapDataModelToEntity(result);
		}

		return null;
	}

	async delete(id: number): Promise<void> {
		await this.customerRepository.delete(id);
	}

	static mapDataModelToEntity(model: CustomerModel): Customer {
		return new Customer(
			model.id,
			model.name,
			model.cpf,
			model.email,
			model.orders
		);
	}

	static mapDataEntityToModel(entity: Customer): CustomerModel {
			return new CustomerModel(
				entity.id,
				entity.name,
				entity.cpf,
				entity.email,
				entity.orders
			);
	}
}