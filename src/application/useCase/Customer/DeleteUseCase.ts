import CustomerRepository from "../../../ports/CustomerRepository";
import AbstractUseCase from "../AbstractUseCase";

export default class DeleteUseCase extends AbstractUseCase {

	constructor(readonly repository: CustomerRepository) {
		super(repository);
	}

	public async execute(id: number): Promise<void | null> {

		if (id == null) {
			this.setError({ message: '"id" is a required field' });
			return null;
		}

		return await this.repository.delete(id);
	}
}