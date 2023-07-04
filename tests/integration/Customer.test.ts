import CreateUseCase from '../../src/core/application/useCase/Customer/CreateUseCase';
import CustomerDatabaseRepository from '../../src/adapter/repository/CustomerDatabaseRepository';
import { AppDataSource } from '../../src/data-source';
import { Customer } from '../../src/database/entities/Customer';

beforeEach(async () => {
	await AppDataSource.initialize();
});

describe('Test customer use cases', () => {
	const mockedCustomer = {
		name: 'Test customer',
		cpf: '0000000000',
		email: 'test@test.com'
	} as Customer;

	test('CreateUseCase', async () => {
		const customerRepository = new CustomerDatabaseRepository();
		const createUseCase = new CreateUseCase(customerRepository);
		const created = await createUseCase.execute(mockedCustomer) as Customer;
		mockedCustomer.id = created.id;

		expect(created).toEqual(mockedCustomer);
		expect(createUseCase.hasErrors()).toBeFalsy();
	});
});