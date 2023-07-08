import { Request, Response } from "express";
import CustomerDatabaseRepository from "../../repository/CustomerDatabaseRepository";
import CreateUseCase from "../../../core/application/useCase/Customer/CreateUseCase";
import FindByCPFUseCase from "../../../core/application/useCase/Customer/FindByCPFUseCase";
import DeleteUseCase from "../../../core/application/useCase/Customer/DeleteUseCase";
import ListUseCase from "../../../core/application/useCase/Customer/ListUseCase";

const customerRepository = new CustomerDatabaseRepository();

export class CustomerController {

	async create(req: Request, res: Response) {
		// #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint para criar um cliente.'
		/* #swagger.parameters['createCustomer'] = {
				in: 'body',
				description: 'Informações do usuário para cadastro.',
				required: true,
				schema: { $ref: "#/definitions/CreateCustomer" }
		} */
		const { name, cpf, email } = req.body;

		const createUseCase = new CreateUseCase(customerRepository);
		const created = await createUseCase.execute({ name, cpf, email });

		if (createUseCase.hasErrors()) {
			return res.status(400).json(createUseCase.getErrors());
		}

		/* #swagger.responses[201] = { 
			schema: { $ref: "#/definitions/Customer" },
			description: 'Cliente cadastrado' 
		} */
		return res.status(201).json(created);
	}

	async list(req: Request, res: Response) {
		// #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint para listar os clientes.'
		const listUseCase = new ListUseCase(customerRepository);
		const customers = await listUseCase.execute();

		if (listUseCase.hasErrors()) {
			return res.status(400).json(listUseCase.getErrors());
		}

		/* #swagger.responses[200] = { 
			schema: { $ref: "#/definitions/ListCustomers" },
			description: 'Clientes encontrados' 
		} */
		return res.status(200).json(customers);
	}

	async getCustomerByCPF(req: Request, res: Response) {
		// #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint para obter um cliente pelo CPF.'
		/* #swagger.parameters['cpf'] = { in: 'path', description: 'CPF do cliente' } */
		const { cpf } = req.params;

		const findByCPFUseCase = new FindByCPFUseCase(customerRepository);
		const customer = await findByCPFUseCase.execute(cpf);

		if (findByCPFUseCase.hasErrors()) {
			return res.status(400).json(findByCPFUseCase.getErrors());
		}

		/* #swagger.responses[200] = { 
			schema: { $ref: "#/definitions/Customer" },
			description: 'Cliente encontrado' 
		} */
		return res.status(200).json(customer);
	}

	async delete(req: Request, res: Response) {
		// #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint para remover um cliente.'
		/* #swagger.parameters['id'] = { in: 'path', description: 'ID do cliente' } */
		const { id } = req.params;
		const customerId = Number(id);
		const deleteUseCase = new DeleteUseCase(customerRepository);
		await deleteUseCase.execute(customerId);

		if (deleteUseCase.hasErrors()) {
			return res.status(400).json(deleteUseCase.getErrors());
		}

		/* #swagger.responses[200] = {
			description: 'Cliente removido' 
		} */
		return res.status(200).json();
	}
}