import { Product } from '../../src/domain/models/Product';
import { ProductCategory } from "../../src/domain/models/ProductCategory";
import ProductCategoryInMemoryRepository from '../utils/repositoryInMemory/ProductCategoryInMemoryRepository';
import ProductCategoryCreateUseCase from "../../src/application/useCase/ProductCategory/ProductCategoryCreateUseCase";
import ProductCategoryFindByIdUseCase from "../../src/application/useCase/ProductCategory/ProductCategoryFindByIdUseCase";
import ProductCategoryUpdateUseCase from "../../src/application/useCase/ProductCategory/ProductCategoryUpdateUseCase";
import ProductCategoryDeleteUseCase from "../../src/application/useCase/ProductCategory/ProductCategoryDeleteUseCase";
import ProductCategoryListUseCase from "../../src/application/useCase/ProductCategory/ProductCategoryListUseCase";

const categoryRepository = new ProductCategoryInMemoryRepository();

const mockedCategory = { name: "Sobremesa" };
const mockedCategoryProducts = [
	{ id: 1, name: "Pudim", description: "Pudim tradicional com calda de caramelo", price: 12.9 } as Product
];

const createUseCase = new ProductCategoryCreateUseCase(categoryRepository);

beforeAll(() => {
	categoryRepository.categories = [];
});

beforeEach(() => {
	categoryRepository.categories = [];
});

afterAll(() => {
	categoryRepository.categories = [];
});

describe('Test product categories use cases', () => {
	//Create
	test('ProductCategoryCreateUseCase - Success', async () => {
		const created = await saveMockCategory(mockedCategory);
		const expected = { ...mockedCategory, id: created?.id };

		expect(created).toEqual(expected);
		expect(createUseCase.hasErrors()).toBeFalsy();
	});

	//FindById
	test('ProductCategoryFindByIdUseCase - Success', async () => {
		const created = await saveMockCategory(mockedCategory);

		const findUseCase = new ProductCategoryFindByIdUseCase(categoryRepository);
		const found = await findUseCase.execute(created?.id!);

		expect(found).toMatchObject(created!);
		expect(findUseCase.hasErrors()).toBeFalsy();
	});

	test('ProductCategoryFindByIdUseCase - Error not found', async () => {
		const findUseCase = new ProductCategoryFindByIdUseCase(categoryRepository);
		const found = await findUseCase.execute(123);

		expect(found).toBeNull();
		expect(findUseCase.hasErrors()).toBeTruthy();
	});

	// //List
	test('ProductCategoryListUseCase - Success', async () => {
		await saveMockCategory(mockedCategory);
		const listUseCase = new ProductCategoryListUseCase(categoryRepository);
		const list = await listUseCase.execute();

		expect(list).toHaveLength(1);
		expect(listUseCase.hasErrors()).toBeFalsy();
	});

	// //Update
	test('ProductCategoryUpdateUseCase - Success', async () => {
		const created = await saveMockCategory(mockedCategory);
		const newName = "Postre"
		const toUpdate = {
			...created!,
			name: newName
		}

		const updateUseCase = new ProductCategoryUpdateUseCase(categoryRepository);
		await updateUseCase.execute(toUpdate);

		expect(categoryRepository.categories).toHaveLength(1);
		expect(categoryRepository.categories[0].name).toBe(newName);
		expect(updateUseCase.hasErrors()).toBeFalsy();
	});

	test('ProductCategoryUpdateUseCase - Error non-existent category', async () => {
		const updateUseCase = new ProductCategoryUpdateUseCase(categoryRepository);
		await updateUseCase.execute({ id: 1, name: "Lanche" } as ProductCategory);

		expect(updateUseCase.hasErrors()).toBeTruthy();
	});

	//Delete
	test('ProductCategoryDeleteUseCase - Success', async () => {
		const created = await saveMockCategory(mockedCategory);

		const deleteUseCase = new ProductCategoryDeleteUseCase(categoryRepository);
		await deleteUseCase.execute(created?.id!);

		expect(categoryRepository.categories).toHaveLength(0);
		expect(deleteUseCase.hasErrors()).toBeFalsy();
	});

	test('ProductCategoryDeleteUseCase - Error "id" is required', async () => {
		const deleteUseCase = new ProductCategoryDeleteUseCase(categoryRepository);
		await deleteUseCase.execute(NaN);

		expect(deleteUseCase.hasErrors()).toBeTruthy();
	});

	test('ProductCategoryDeleteUseCase - Error category is in use', async () => {
		const createdCategory = await saveMockCategory(mockedCategory);
		createdCategory!.products = mockedCategoryProducts;

		const deleteUseCase = new ProductCategoryDeleteUseCase(categoryRepository);
		await deleteUseCase.execute(createdCategory?.id!);

		expect(categoryRepository.categories).toHaveLength(1);
		expect(deleteUseCase.hasErrors()).toBeTruthy();
	});
});

async function saveMockCategory(mock: ProductCategory): Promise<ProductCategory | null> {
	const created = await createUseCase.execute(mock);
	return created;
}