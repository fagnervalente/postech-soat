import { Product } from './../../src/domain/models/Product';
import { ProductCategory } from "../../src/domain/models/ProductCategory";
import ProductCategoryInMemoryRepository from '../utils/repositoryInMemory/ProductCategoryInMemoryRepository';
import ProductCreateUseCase from '../../src/application/useCase/Product/ProductCreateUseCase';
import ProductInMemoryRepository from '../utils/repositoryInMemory/ProductInMemoryRepository';
import ProductDeleteUseCase from '../../src/application/useCase/Product/ProductDeleteUseCase';
import ProductFindByIdUseCase from '../../src/application/useCase/Product/ProductFindByIdUseCase';
import ProductListByCategoryUseCase from '../../src/application/useCase/Product/ProductListByCategoryUseCase';
import { ProductUpdateUseCase, ProductUpdateBody } from '../../src/application/useCase/Product/ProductUpdateUseCase';

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

	test('ProductUpdateUseCase - Success', async () => {
		const created = await saveMockProduct(mockedProduct);
		const toUpdate: ProductUpdateBody = {
			id: created?.id!,
			name: "Teste1",
			description: created?.description!,
			price: created?.price!,
			categoryId: created?.category.id!
		}

		const updateUseCase = new ProductUpdateUseCase(productRepository, categoryRepository);
		await updateUseCase.execute(toUpdate);

		expect(productRepository.products).toHaveLength(1);
		expect(productRepository.products[0].name).toBe("Teste1");
		expect(updateUseCase.hasErrors()).toBeFalsy();
	});

	test('ProductUpdateUseCase - Error must have required property "id"', async () => {
		const created = await saveMockProduct(mockedProduct);
		const toUpdate: ProductUpdateBody = {
			id: undefined,
			name: "Teste1",
			description: created?.description!,
			price: created?.price!,
			categoryId: created?.category.id!
		}

		const updateUseCase = new ProductUpdateUseCase(productRepository, categoryRepository);
		await updateUseCase.execute(toUpdate);

		expect(productRepository.products).toHaveLength(1);
		expect(productRepository.products[0].name).toBe("Teste");
		expect(updateUseCase.hasErrors()).toBeTruthy();
		expect(updateUseCase.getErrors()[0]).toMatchObject({
			type: 'ValidationError',
			message: "must have required property 'id'"
		})
	});

	test('ProductUpdateUseCase - Error Product not found!', async () => {
		const created = await saveMockProduct(mockedProduct);
		const toUpdate: ProductUpdateBody = {
			id: 1000,
			name: "Teste1",
			description: created?.description!,
			price: created?.price!,
			categoryId: created?.category.id!
		}

		const updateUseCase = new ProductUpdateUseCase(productRepository, categoryRepository);
		await updateUseCase.execute(toUpdate);

		expect(productRepository.products).toHaveLength(1);
		expect(productRepository.products[0].name).toBe("Teste");
		expect(updateUseCase.hasErrors()).toBeTruthy();
		expect(updateUseCase.getErrors()[0]).toMatchObject({
			type: 'ValidationError',
			message: "Product not found!"
		})
	});

	test('ProductUpdateUseCase - Error Product category not found!', async () => {
		const created = await saveMockProduct(mockedProduct);
		const toUpdate: ProductUpdateBody = {
			id: created?.id,
			name: "Teste1",
			description: created?.description!,
			price: created?.price!,
			categoryId: 1000
		}

		const updateUseCase = new ProductUpdateUseCase(productRepository, categoryRepository);
		await updateUseCase.execute(toUpdate);

		expect(productRepository.products).toHaveLength(1);
		expect(productRepository.products[0].name).toBe("Teste");
		expect(updateUseCase.hasErrors()).toBeTruthy();
		expect(updateUseCase.getErrors()[0]).toMatchObject({
			type: 'ValidationError',
			message: "Product category not found!"
		})
	});
});

async function saveMockProduct(mock: Product): Promise<Product | null> {
	const created = await createUseCase.execute(mock);
	return created;
}