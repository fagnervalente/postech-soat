import CreateUseCase from "../../src/core/application/useCase/Order/CreateUseCase";
import ListUseCase from "../../src/core/application/useCase/Order/ListUseCase";
import UpdateUseCase from "../../src/core/application/useCase/Order/UpdateUseCase";
import OrderInMemoryRepository from '../../src/adapter/repository/inMemory/OrderInMemoryRepository';
import ProductInMemoryRepository from '../../src/adapter/repository/inMemory/ProductInMemoryRepository';
import CustomerInMemoryRepository from '../../src/adapter/repository/inMemory/CustomerInMemoryRepository';
import { Customer } from "../../src/database/entities/Customer";
import { Product } from "../../src/database/entities/Product";
import { Order, OrderPaymentStatus, OrderStatus } from "../../src/database/entities/Order";
import { ProductCategory } from "../../src/database/entities/ProductCategory";
import ProductCategoryInMemoryRepository from "../../src/adapter/repository/inMemory/ProductCategoryInMemoryRepository";

const mockedCustomers: Customer[] = [{id: 1, name: "Panguji Piranti Lunak", cpf: "12312312312", email: "panguji@gmail.com"}];

const mockedCategories: ProductCategory[] = [{name: 'Sobremesa', id: 1}];

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
		await saveMockOrder({...mockedOrder, products: []});
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
});

async function saveMockOrder(mock: Order|any): Promise<Order | null> {
	const created = await createUseCase.execute(mock);
	return created;
}