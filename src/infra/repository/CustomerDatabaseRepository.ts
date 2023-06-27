import CustomerRepository from "../../application/repository/CustomerRepository";
import { AppDataSource } from "../../data-source";
import { Customer } from "../../entities/Customer";

export default class CustomerDatabaseRepository implements CustomerRepository {

  customerRepository = AppDataSource.getRepository(Customer);

  async save(customer: Customer): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customer);
    return await this.customerRepository.save(newCustomer);
  }

  async findByCPF(cpf: string): Promise<Customer | null> {
    const result = await this.customerRepository.findOneBy({ cpf });
    return result;
  }

}