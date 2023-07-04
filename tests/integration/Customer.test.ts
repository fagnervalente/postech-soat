import CreateUseCase from '../../src/core/application/useCase/Customer/CreateUseCase';
import CustomerDatabaseRepository from '../../src/adapter/repository/CustomerDatabaseRepository';
import { AppDataSource } from '../../src/data-source';
import { Customer } from '../../src/database/entities/Customer';

beforeAll(async () => {
	await AppDataSource.initialize();
});

describe('Test customer use cases', () => {
	const mockedCustomer = { name: 'Test customer', cpf: '0000000000', email: 'test@test.com' } as Customer;
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
	});
});