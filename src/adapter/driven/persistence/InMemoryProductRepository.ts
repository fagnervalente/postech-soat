import IProduct from '../../../core/domain/Product/IProduct';
import IProductRepository from '../../../core/application/ports/IProductReporsitory';

export default class InMemoryProductRepository implements IProductRepository {
	public products: IProduct[] = [
		{id: '1', name: 'Tenis NIKE', price: 299.99},
		{id: '2', name: 'Tenis ADIDAS', price: 289.99}
	];

	public async getById(id: string): Promise<IProduct> {
		const product = this.products.find(product => product.id === id);

		if (!product) {
			throw new Error(`Product with id '${id}' not found`);
		}

		return product;
	}

	public async getListing(): Promise<IProduct[]> {
		return this.products;
	}

	public async store(product: IProduct): Promise<IProduct> {
		const created = {...product, id: Math.floor(Math.random() * Date.now()).toString()};
		this.products.push(created);

		return created;
	}

	public async update(product: IProduct): Promise<void> {
		const existingProduct = await this.getById(product.id);

		existingProduct.name = product.name;
		existingProduct.price = product.price;
	}

	public async delete(id: string): Promise<void> {
		this.products = this.products.filter((product: IProduct) => {
			return product.id != id;
		});
	}
}