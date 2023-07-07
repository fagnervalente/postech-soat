import { Customer } from "../../../../database/entities/Customer";
import { Order, OrderPaymentStatus } from "../../../../database/entities/Order";
import OrderDomain from "../../../domain/Order/Order";
import OrderRepository from "../../ports/OrderRepository";
import ProductRepository from "../../ports/ProductRepository";
import CustomerRepository from "../../ports/CustomerRepository";
import CustomerFindByCPFUseCase from '../Customer/FindByCPFUseCase';
import ProductFindByIdUseCase from '../Product/ProductFindByIdUseCase';
import AbstractUseCase from "../AbstractUseCase";
import { Product } from "../../../../database/entities/Product";

export default class CreateUseCase extends AbstractUseCase {
	private customerRepository: CustomerRepository;
	private productRepository: ProductRepository;

	constructor(readonly repository: OrderRepository, customerRepository: CustomerRepository, productRepository: ProductRepository) {
		super(repository);
		this.customerRepository = customerRepository;
		this.productRepository = productRepository;
	}

	public async execute(order: Order): Promise<Order | null> {
		const orderCustomer = await this.getParsedCustomer(order);
		const orderProducts = await this.getParsedProducts(order);

		if (this.hasErrors()) {
			return null;
		}

		order.customer = orderCustomer;
		order.products = orderProducts;
		// checkout mockado
		order.paymentStatus = OrderPaymentStatus.APROVADO;
		order.totalPrice = OrderDomain.calculateTotalPrice(order.products);
		return await this.repository.save(order);
	}

	private async getParsedCustomer(order: Order): Promise<Customer | undefined> {
		if (order.customer && order.customer.cpf) {
			const customerFindByCPFUseCase = new CustomerFindByCPFUseCase(this.customerRepository);
			const customer = await customerFindByCPFUseCase.execute(order.customer.cpf) as Customer;

			if (!customerFindByCPFUseCase.hasErrors()) {
				return customer;
			}

			this.setErrors(customerFindByCPFUseCase.getErrors());
		}

		return undefined;
	}

	private async getParsedProducts(order: Order): Promise<Product[] | undefined> {
		if (!order.products || order.products.length === 0) {
			this.setError({ message: "Order must have at least one product" });
			return undefined;
		}

		const getProduct = new ProductFindByIdUseCase(this.productRepository);
		let productsFound: Product[] = []

		for (const id of order.products) {
			const product = await getProduct.execute(Number(id));

			if (getProduct.hasErrors()) {
				this.setErrors(getProduct.getErrors());
			}

			productsFound.push(product!);
		}

		return productsFound;
	}
}