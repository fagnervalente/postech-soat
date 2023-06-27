import { Customer } from "../../../entities/Customer";
import CustomerRepository from "../../repository/CustomerRepository";

export default class CustomerCreator {

  constructor(readonly customerRepository: CustomerRepository) { }

  async execute(customer: Customer): Promise<Customer> {
    return await this.customerRepository.save(customer);
  }
}