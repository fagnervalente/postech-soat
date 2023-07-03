import { Customer } from "../../../../database/entities/Customer";
import CustomerRepository from "../../ports/CustomerRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class FindByCPFUseCase extends AbstractUseCase {

	constructor(readonly repository: CustomerRepository) {
		super(repository);
	}

	async execute(cpf: string): Promise<Customer | null> {
		const customer = await this.repository.findByCPF(cpf);

		if (!customer) {
			this.setError({ message: 'Customer not found!' });
		}

		return customer;
	}
}