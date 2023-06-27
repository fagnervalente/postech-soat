import { Customer } from "../../../entities/Customer";
import CustomerRepository from "../../repository/CustomerRepository";

export default class FindCustomerByCPF {

  constructor(readonly customerRepository: CustomerRepository) { }

  async execute(cpf: string): Promise<Customer | null> {
    return await this.customerRepository.findByCPF(cpf);
  }
}