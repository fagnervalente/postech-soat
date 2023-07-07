import { Request, Response } from "express";
import CustomerDatabaseRepository from "../../repository/CustomerDatabaseRepository";
import CreateUseCase from "../../../core/application/useCase/Customer/CreateUseCase";
import FindByCPFUseCase from "../../../core/application/useCase/Customer/FindByCPFUseCase";
import DeleteUseCase from "../../../core/application/useCase/Customer/DeleteUseCase";
import ListUseCase from "../../../core/application/useCase/Customer/ListUseCase";

const customerRepository = new CustomerDatabaseRepository();

export class CustomerController {

	async create(req: Request, res: Response) {
		const { name, cpf, email } = req.body;

		const createUseCase = new CreateUseCase(customerRepository);
		const created = await createUseCase.execute({ name, cpf, email });

		if (createUseCase.hasErrors()) {
			return res.status(400).json(createUseCase.getErrors());
		}

		return res.status(201).json(created);
	}

	async list(req: Request, res: Response) {
		const listUseCase = new ListUseCase(customerRepository);
		const customers = await listUseCase.execute();

		if (listUseCase.hasErrors()) {
			return res.status(400).json(listUseCase.getErrors());
		}

		return res.status(200).json(customers);
	}

	async getCustomerByCPF(req: Request, res: Response) {
		const { cpf } = req.params;

		const findByCPFUseCase = new FindByCPFUseCase(customerRepository);
		const customer = await findByCPFUseCase.execute(cpf);

		if (findByCPFUseCase.hasErrors()) {
			return res.status(400).json(findByCPFUseCase.getErrors());
		}

		return res.status(200).json(customer);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		const customerId = Number(id);
		const deleteUseCase = new DeleteUseCase(customerRepository);
		await deleteUseCase.execute(customerId);

		if (deleteUseCase.hasErrors()) {
			return res.status(400).json(deleteUseCase.getErrors());
		}

		return res.status(200).json();
	}
}