import { Customer } from './../entities/Customer';
import { Request, Response } from "express";
import CustomerDatabaseRepository from "../infra/repository/CustomerDatabaseRepository";
import CustomerCreator from "../application/usecase/Customer/CustomerCreator";
import FindCustomerByCPF from '../application/usecase/Customer/FindCustomerByCPF';

const customerRepository = new CustomerDatabaseRepository();

export class CustomerController {

  async create(req: Request, res: Response) {
    const { name, cpf, email } = req.body;
    const customer: Customer = {
      name,
      cpf,
      email
    }

    try {
      const customerCreator = new CustomerCreator(customerRepository);
      const result = await customerCreator.execute(customer);
      return res.status(201).json(result);
    } catch (error: any) {
      if (error.code == "23505") {
        return res.status(409).json({ message: error.detail })
      } else if (error.code == "23502") {
        return res.status(400).json({ message: error.detail })
      }
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getCustomerByCPF(req: Request, res: Response) {
    const { cpf } = req.params;

    try {
      const getCustomer = new FindCustomerByCPF(customerRepository);
      const customer = await getCustomer.execute(cpf);

      if (!customer) {
        return res.status(404).json({ message: 'Customer not found!' });
      }

      return res.status(200).json(customer);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}