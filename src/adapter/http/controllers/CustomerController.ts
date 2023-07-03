import { Request, Response } from "express";
import CustomerDatabaseRepository from "../../repository/CustomerDatabaseRepository";
import CreateUseCase from "../../../core/application/useCase/Customer/CreateUseCase";
import FindByCPFUseCase from "../../../core/application/useCase/Customer/FindByCPFUseCase";

const customerRepository = new CustomerDatabaseRepository();

export class CustomerController {

  async create(req: Request, res: Response) {
    const { name, cpf, email } = req.body;

	const createUseCase = new CreateUseCase(customerRepository);
	const created = await createUseCase.execute({name, cpf, email});

	if (createUseCase.hasErrors()) {
		return res.status(400).json(createUseCase.getErrors());
	}

	return res.status(201).json(created);
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
}