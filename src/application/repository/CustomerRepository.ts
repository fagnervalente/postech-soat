import { Customer } from "../../entities/Customer";

export default interface CustomerRepository {
  save(customer: Customer): Promise<Customer>;
  findByCPF(cpf: string): Promise<Customer | null>;
}