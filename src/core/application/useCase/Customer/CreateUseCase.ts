import { Customer } from "../../../../database/entities/Customer";
import CustomerRepository from "../../ports/CustomerRepository";
import AbstractUseCase from "../AbstractUseCase";
import FindByCPFUseCase from "./FindByCPFUseCase";

export default class CreateUseCase extends AbstractUseCase {

	constructor(readonly repository: CustomerRepository) {
		super(repository);
	}

	public async execute(customer: Customer): Promise<Customer | null> {
		await this.validateFields(customer);

		if (this.hasErrors()) {
			return null;
		}

		return await this.repository.save(customer);
	}

	private async validateFields(customer: Customer): Promise<void> {
		await this.validateRequiredFields(customer);
		await this.validateCPFInUse(customer);
	}

	private async validateRequiredFields(customer: Customer): Promise<void> {
		if (!customer.cpf) {
			this.setError({message: '"cpf" is a required field'});
		}

		if (!customer.email) {
			this.setError({message: '"email" is a required field'});
		}
	}

	private async validateCPFInUse(customer: Customer): Promise<void> {
		const findByCPFUseCase = new FindByCPFUseCase(this.repository);
		const existingCustomer = await findByCPFUseCase.execute(customer.cpf);

		if (existingCustomer) {
			this.setError({message: 'CPF informed is already registered in our system'});
		}
	}
}