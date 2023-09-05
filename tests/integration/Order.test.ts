import CreateUseCase from "../../src/application/useCase/Order/CreateUseCase";
import ListUseCase from "../../src/application/useCase/Order/ListUseCase";
import UpdateUseCase from "../../src/application/useCase/Order/UpdateUseCase";
import UpdatePaymentStatusUseCase from "../../src/application/useCase/Order/UpdatePaymentStatusUseCase";
import GetOrderPaymentStatus from "../../src/application/useCase/Order/GetOrderPaymentStatus";
import OrderInMemoryRepository from '../utils/repositoryInMemory/OrderInMemoryRepository';
import ProductInMemoryRepository from '../utils/repositoryInMemory/ProductInMemoryRepository';
import CustomerInMemoryRepository from '../utils/repositoryInMemory/CustomerInMemoryRepository';
import { CustomerModel as Customer } from "../../src/adapter/database/models/CustomerModel";
import { ProductModel as Product } from "../../src/adapter/database/models/ProductModel";
import { OrderModel as Order, OrderPaymentStatus, OrderStatus } from "../../src/adapter/database/models/OrderModel";
import { ProductCategoryModel as ProductCategory } from "../../src/adapter/database/models/ProductCategoryModel";
import ProductCategoryInMemoryRepository from "../utils/repositoryInMemory/ProductCategoryInMemoryRepository";
import MockedPaymentStatusGateway from "../utils/mockedPaymentGateways/mockedPaymentStatusGateway";

const mockedCustomers: Customer[] = [{ id: 1, name: "Panguji Piranti Lunak", cpf: "12312312312", email: "panguji@gmail.com" }];

const mockedCategories: ProductCategory[] = [{ name: 'Sobremesa', id: 1 }];

const mockedProduct: Product = {
	id: 1,
	name: "Pudim",
	description: "Pudim tradicional com calda de caramelo",
	price: 12.9,
	category: mockedCategories[0]
};
const mockedProducts: Product[] = [mockedProduct];

const mockedOrder = {
	customer: mockedCustomers[0],
	products: mockedProducts,
	status: OrderStatus.RECEBIDO
};


const orderRepository = new OrderInMemoryRepository();
const customerRepository = new CustomerInMemoryRepository();
const categoryRepository = new ProductCategoryInMemoryRepository();
const productRepository = new ProductInMemoryRepository();

const createUseCase = new CreateUseCase(orderRepository, customerRepository, productRepository);

beforeAll(() => {
	customerRepository.customers = mockedCustomers;
	categoryRepository.categories = mockedCategories;
	productRepository.products = mockedProducts;
});

afterEach(() => {
	customerRepository.customers = mockedCustomers;
	categoryRepository.categories = mockedCategories;
	productRepository.products = mockedProducts;
	orderRepository.orders = [];
});

describe('Test order use cases', () => {
	// Create
	test('CreateUseCase - Success', async () => {
		const order = await saveMockOrder(mockedOrder);

		expect(order).toEqual({ ...mockedOrder, id: order?.id });
		expect(createUseCase.hasErrors()).toBeFalsy();
	});

	test('CreateUseCase - Error Order must have at least one product', async () => {
		await saveMockOrder({ ...mockedOrder, products: [] });
		expect(createUseCase.hasErrors()).toBeTruthy();
		expect(createUseCase.getErrors()).toHaveLength(1);
	});

	//List
	test('ListUseCase - Success', async () => {
		await saveMockOrder(mockedOrder);
		const listUseCase = new ListUseCase(orderRepository);
		const list = await listUseCase.execute();

		expect(list).toHaveLength(1);
		expect(listUseCase.hasErrors()).toBeFalsy();
	});

	//GetOrderPaymentStatus
	test('GetOrderPaymentStatus - Success', async () => {
		const order = await saveMockOrder(mockedOrder);
		const expectedPaymentStatus = order?.paymentStatus;

		const getStatusUseCase = new GetOrderPaymentStatus(orderRepository);
		const status = await getStatusUseCase.execute(Number(order?.id));

		expect(status).toBe(expectedPaymentStatus);
		expect(getStatusUseCase.hasErrors()).toBeFalsy();
	});

	//Update
	test('UpdateUseCase - Success', async () => {
		const created = await saveMockOrder(mockedOrder);

		const toUpdate: Order = {
			id: created?.id!,
			status: OrderStatus.FINALIZADO
		}

		const updateUseCase = new UpdateUseCase(orderRepository);
		await updateUseCase.execute(toUpdate);

		expect(orderRepository.orders).toHaveLength(1);
		expect(orderRepository.orders[0].status).toBe(OrderStatus.FINALIZADO);
		expect(updateUseCase.hasErrors()).toBeFalsy();
	});

	test('UpdateUseCase - Error must have required property "id"', async () => {
		const created = await saveMockOrder(mockedOrder);

		const toUpdate: Order = {
			status: OrderStatus.FINALIZADO
		}

		const updateUseCase = new UpdateUseCase(orderRepository);
		await updateUseCase.execute(toUpdate);

		expect(orderRepository.orders).toHaveLength(1);
		expect(orderRepository.orders[0].status).toBe(created?.status);
		expect(updateUseCase.hasErrors()).toBeTruthy();
	});

	test('UpdateUseCase - Error order not found', async () => {
		const toUpdate: Order = {
			id: 123,
			status: OrderStatus.FINALIZADO
		}

		const updateUseCase = new UpdateUseCase(orderRepository);
		await updateUseCase.execute(toUpdate);

		expect(orderRepository.orders).toHaveLength(0);
		expect(updateUseCase.hasErrors()).toBeTruthy();
	});

	//Update Payment Status
	test('UpdatePaymentStatusUseCase - Success', async () => {
		const mockedPaymentStatusGateway = new MockedPaymentStatusGateway(OrderPaymentStatus.RECUSADO);
		const created = await saveMockOrder(mockedOrder);

		const orderId = created?.id;
		
		const updatePaymentStatus = new UpdatePaymentStatusUseCase(orderRepository);
		await updatePaymentStatus.execute(Number(orderId), mockedPaymentStatusGateway);
		
		expect(orderRepository.orders[0].paymentStatus).toBe(OrderPaymentStatus.RECUSADO);
		expect(updatePaymentStatus.hasErrors()).toBeFalsy();
	});
});

async function saveMockOrder(mock: Order | any): Promise<Order | null> {
	const created = await createUseCase.execute(mock);
	return created;
}