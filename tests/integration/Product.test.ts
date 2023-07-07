import { Product } from './../../src/database/entities/Product';
import { ProductCategory } from "../../src/database/entities/ProductCategory";
import ProductCategoryInMemoryRepository from '../../src/adapter/repository/inMemory/ProductCategoryInMemoryRepository';
import ProductCreateUseCase from '../../src/core/application/useCase/Product/ProductCreateUseCase';
import ProductInMemoryRepository from '../../src/adapter/repository/inMemory/ProductInMemoryRepository';
import ProductDeleteUseCase from '../../src/core/application/useCase/Product/ProductDeleteUseCase';
import ProductFindByIdUseCase from '../../src/core/application/useCase/Product/ProductFindByIdUseCase';
import ProductListByCategoryUseCase from '../../src/core/application/useCase/Product/ProductListByCategoryUseCase';
import ProductUpdateUseCase from '../../src/core/application/useCase/Product/ProductUpdateUseCase';

const categoryRepository = new ProductCategoryInMemoryRepository();
const mockCategoriesList: ProductCategory[] = [
	{ name: "Lanche", id: 1 },
	{ name: "Acompanhamento", id: 2 },
	{ name: "Bebida", id: 3 },
]

const productRepository = new ProductInMemoryRepository();
const mockedProduct: Product = {
	category: mockCategoriesList[0],
	description: "Teste description",
	name: "Teste",
	price: 15.0,
}

const createUseCase = new ProductCreateUseCase(productRepository, categoryRepository);

beforeAll(() => {
	categoryRepository.categories = mockCategoriesList;
});

afterEach(() => {
	productRepository.products = [];
});

afterAll(() => {
	categoryRepository.categories = [];
});

describe('Test product use cases', () => {
	test('ProductCreateUseCase - Success', async () => {
		const created = await saveMockProduct(mockedProduct);

		expect(created).toEqual({ ...mockedProduct, id: created?.id });
		expect(createUseCase.hasErrors()).toBeFalsy();
	});

	test('ProductDeleteUseCase - Success', async () => {
		const created = await saveMockProduct(mockedProduct);

		const deleteUseCase = new ProductDeleteUseCase(productRepository);
		await deleteUseCase.execute(created?.id!);

		expect(productRepository.products).toHaveLength(0);
		expect(deleteUseCase.hasErrors()).toBeFalsy();
	});

	test('ProductDeleteUseCase - Error "id" is required', async () => {
		const deleteUseCase = new ProductDeleteUseCase(productRepository);
		await deleteUseCase.execute(null);

		expect(deleteUseCase.hasErrors()).toBeTruthy();
	});

	test('ProductFindByIdUseCase - Success', async () => {
		const created = await saveMockProduct(mockedProduct);

		const findUseCase = new ProductFindByIdUseCase(productRepository);
		const finded = await findUseCase.execute(created?.id!);

		expect(finded).toMatchObject(mockedProduct);
		expect(findUseCase.hasErrors()).toBeFalsy();
	});

	test('ProductFindByIdUseCase - Error not found', async () => {
		const findUseCase = new ProductFindByIdUseCase(productRepository);
		const finded = await findUseCase.execute(123);

		expect(finded).toBeNull();
		expect(findUseCase.hasErrors()).toBeTruthy();
	});

	test('ProductListByCategoryUseCase - Success', async () => {
		await saveMockProduct(mockedProduct);

		const listUseCase = new ProductListByCategoryUseCase(productRepository, categoryRepository);
		const list = await listUseCase.execute(mockedProduct.category.id ?? 0);

		expect(list).toHaveLength(1);
		expect(listUseCase.hasErrors()).toBeFalsy();
	});

	test.skip('ProductUpdateUseCase - Success', async () => { //TODO: Falta concluir
		const created = await saveMockProduct(mockedProduct);
		const toUpdate = {
			...created!,
			name: "Teste1"
		}

		const updateUseCase = new ProductUpdateUseCase(productRepository);
		await updateUseCase.execute(toUpdate);

		expect(productRepository.products).toHaveLength(1);
		// expect(productRepository.products[0].name).toBe("Teste1");
		// expect(updateUseCase.hasErrors()).toBeFalsy();
	});
});

async function saveMockProduct(mock: Product): Promise<Product | null> {
	const created = await createUseCase.execute(mock);
	return created;
}