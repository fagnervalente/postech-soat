import { Customer } from "../../../../database/entities/Customer";
import CustomerRepository from "../../ports/CustomerRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class CreateUseCase extends AbstractUseCase {

	constructor(readonly repository: CustomerRepository) {
		super(repository);
	}

	async execute(customer: Customer): Promise<Customer> {
		return await this.repository.save(customer);
	}
}