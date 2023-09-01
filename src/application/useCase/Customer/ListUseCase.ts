import { Customer } from "../../../domain/models/Customer";
import CustomerRepository from "../../../ports/CustomerRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class ListUseCase extends AbstractUseCase {

	constructor(readonly repository: CustomerRepository) {
		super(repository);
	}

	async execute(): Promise<Customer[] | null> {
		return await this.repository.list();
	}
}