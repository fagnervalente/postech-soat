import { AppDataSource } from '../../src/data-source';
import { Customer } from '../../src/database/entities/Customer';
import CustomerDatabaseRepository from '../../src/adapter/repository/CustomerDatabaseRepository';
import CreateUseCase from '../../src/core/application/useCase/Customer/CreateUseCase';
import FindByCPFUseCase from '../../src/core/application/useCase/Customer/FindByCPFUseCase';
import DeleteUseCase from '../../src/core/application/useCase/Customer/DeleteUseCase';

const mockedCustomer = { name: 'Test customer', cpf: '0000000000', email: 'test@test.com' } as Customer;

beforeAll(async () => {
	await AppDataSource.initialize();
});

afterAll(async () => {
	const mockedCustomerId = mockedCustomer.id as number;
	const deleteUseCase = new DeleteUseCase(new CustomerDatabaseRepository());
	await deleteUseCase.execute(mockedCustomerId);
});

describe('Test customer use cases with database repository', () => {
	const customerRepository = new CustomerDatabaseRepository();

	test('CreateUseCase', async () => {
		const createUseCase = new CreateUseCase(customerRepository);
		const created = await createUseCase.execute(mockedCustomer) as Customer;
		mockedCustomer.id = created?.id ?? 0;

		expect(created).toEqual(mockedCustomer);
		expect(createUseCase.hasErrors()).toBeFalsy();
	});

	test('CreateUseCase_MISSING_REQUIRED_FIELDS', async () => {
		const invalidCustomer = { name: 'Test customer' } as Customer;
		const createUseCase = new CreateUseCase(customerRepository);
		const created = await createUseCase.execute(invalidCustomer) as Customer;

		expect(created).toEqual(null);
		expect(createUseCase.hasErrors()).toBeTruthy();
		expect(createUseCase.getErrors().length).toEqual(2);
	});

	test('CreateUseCase_CPF_IN_USE', async () => {
		const createUseCase = new CreateUseCase(customerRepository);
		const created = await createUseCase.execute(mockedCustomer) as Customer;

		expect(created).toEqual(null);
		expect(createUseCase.hasErrors()).toBeTruthy();
		expect(createUseCase.getErrors().length).toEqual(1);
	});

	test('FindByCPFUseCase', async () => {
		const mockedCustomerCpf = mockedCustomer.cpf as string;
		const findByCPFUseCase = new FindByCPFUseCase(customerRepository);
		const finded = await findByCPFUseCase.execute(mockedCustomerCpf) as Customer;

		expect(finded).toEqual(mockedCustomer);
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
		const mockedCustomerId = mockedCustomer.id as number;
		const deleteUseCase = new DeleteUseCase(customerRepository);
		await deleteUseCase.execute(mockedCustomerId);

		expect(deleteUseCase.hasErrors()).toBeFalsy();
	});
});