import ProductService from "../../src/core/application/services/ProductService";
import InMemoryProductRepository from "../../src/adapter/driven/persistence/InMemoryProductRepository";

describe('Test service layer with "inMemory" driven adapter', () => {
	const repository = new InMemoryProductRepository();
	const mockedProduct = repository.products[0];

	test('getListing', async () => {
		const productService = new ProductService(repository);
		expect(await productService.getListing()).toEqual(repository.products);
		expect(productService.hasErrors()).toBeFalsy();
	});

	test('getById', async () => {
		const productService = new ProductService(repository);
		expect(await productService.getById(mockedProduct.id)).toEqual(repository.products[0]);
		expect(productService.hasErrors()).toBeFalsy();
	});

	test('getById_NOT_FOUND', async () => {
		const productService = new ProductService(repository);
		expect(await productService.getById('INVALID_ID')).toBe(undefined);
		expect(productService.hasErrors()).toBeTruthy();
		expect(productService.getErrors().length).toBe(1);
	});

	test('store', async () => {
		const productService = new ProductService(repository);
		const products = [
			{id: '', name: 'Test store product 1', price: 100},
			{id: '', name: 'Test store product 2', price: 0},
			{id: '', name: 'Test store product 3', price: 29.99}
		];

		products.forEach(async newProduct => {
			await productService.store(newProduct);
			expect(productService.hasErrors()).toBeFalsy();
		});
	});

	test('store_INVALID_PRICE', async () => {
		const productService = new ProductService(repository);
		await productService.store({id: '', name: 'Test store product', price: -1});
		expect(productService.hasErrors()).toBeTruthy();
		expect(productService.getErrors().length).toBe(1);
	});

	test('store_INVALID_NAME', async () => {
		const productService = new ProductService(repository);
		await productService.store({id: '', name: '', price: 100});
		expect(productService.hasErrors()).toBeTruthy();
	});

	test('update', async () => {
		const productService = new ProductService(repository);
		const updated = {...mockedProduct, id: mockedProduct.id, name: 'Test update product'};
		await productService.update(updated);
		expect(productService.hasErrors()).toBeFalsy();
	});

	test('update_INVALID_PRICE', async () => {
		const productService = new ProductService(repository);
		const updated = {...mockedProduct, id: mockedProduct.id, price: -50};
		await productService.update(updated);
		expect(productService.hasErrors()).toBeTruthy();
	});

	test('update_INVALID_NAME', async () => {
		const productService = new ProductService(repository);
		const updated = {...mockedProduct, id: mockedProduct.id, name: ''};
		await productService.update(updated);
		expect(productService.hasErrors()).toBeTruthy();
	});
});