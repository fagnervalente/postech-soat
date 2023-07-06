import { Customer } from '../../src/database/entities/Customer';
import CustomerInMemoryRepository from '../../src/adapter/repository/CustomerInMemoryRepository';
import ListUseCase from '../../src/core/application/useCase/Customer/ListUseCase';
import CreateUseCase from '../../src/core/application/useCase/Customer/CreateUseCase';
import FindByCPFUseCase from '../../src/core/application/useCase/Customer/FindByCPFUseCase';
import DeleteUseCase from '../../src/core/application/useCase/Customer/DeleteUseCase';

const customerRepository = new CustomerInMemoryRepository();
const mockedList = [
	{id: 1,  name: 'Henrique', cpf: '51650096291', email: 'test.lucas@test.com'},
	{id: 2,  name: 'Joao', cpf: '16245755794', email: 'test.joao@test.com'},
	{id: 3,  name: 'Raquel', cpf: '91039690882', email: 'test.raquel@test.com'},
	{id: 4,  name: 'Gabriel', cpf: '66881061757', email: 'test.grabriel@test.com'},
	{id: 5,  name: 'Rafaela', cpf: '96236155151', email: 'test.rafaela@test.com'}
];

beforeAll(() => {
	customerRepository.customers = mockedList;
});

describe('Test customer use cases with in memory repository', () => {
	test('CreateUseCase', async () => {
		const mockedCustomer = { name: 'Test customer', cpf: '0000000000', email: 'test@gmail.com' } as Customer;
		const createUseCase = new CreateUseCase(customerRepository);
		const created = await createUseCase.execute(mockedCustomer) as Customer;

		expect(created).toEqual({...mockedCustomer, id: created.id});
		expect(createUseCase.hasErrors()).toBeFalsy();
	});

	test('CreateUseCase_MISSING_REQUIRED_FIELDS', async () => {
		const invalidCustomer = {} as Customer;
		const createUseCase = new CreateUseCase(customerRepository);
		const created = await createUseCase.execute(invalidCustomer) as Customer;

		expect(created).toEqual(null);
		expect(createUseCase.hasErrors()).toBeTruthy();
		expect(createUseCase.getErrors().length).toEqual(3);
	});

	test('CreateUseCase_CPF_IN_USE', async () => {
		const mockedCustomer = { name: mockedList[0].name, cpf: mockedList[0].cpf, email: mockedList[0].email } as Customer;
		const createUseCase = new CreateUseCase(customerRepository);
		const created = await createUseCase.execute(mockedCustomer) as Customer;

		expect(created).toEqual(null);
		expect(createUseCase.hasErrors()).toBeTruthy();
		expect(createUseCase.getErrors().length).toEqual(1);
	});

	test('FindByCPFUseCase', async () => {
		const mockedCustomerCpf = mockedList[0].cpf as string;
		const findByCPFUseCase = new FindByCPFUseCase(customerRepository);
		const finded = await findByCPFUseCase.execute(mockedCustomerCpf) as Customer;

		expect(finded).toEqual(mockedList[0]);
		expect(findByCPFUseCase.hasErrors()).toBeFalsy();
	});

	test('FindByCPFUseCase_NOT_FOUND', async () => {
		const findByCPFUseCase = new FindByCPFUseCase(customerRepository);
		const finded = await findByCPFUseCase.execute('INVALID_CPF') as Customer;

		expect(finded).toEqual(null);
		expect(findByCPFUseCase.hasErrors()).toBeTruthy();
		expect(findByCPFUseCase.getErrors().length).toEqual(1);
	});

	test('DeleteUseCase', async () => {
		const mockedCustomerId = mockedList[0].id as number;
		const deleteUseCase = new DeleteUseCase(customerRepository);
		await deleteUseCase.execute(mockedCustomerId);

		expect(deleteUseCase.hasErrors()).toBeFalsy();
	});

	test('ListUseCase', async () => {
		const listUseCase = new ListUseCase(customerRepository);
		const list = await listUseCase.execute() as Customer[];

		expect(list).toEqual(customerRepository.customers);
		expect(listUseCase.hasErrors()).toBeFalsy();
	});
});