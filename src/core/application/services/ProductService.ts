import IProductRepository from "../ports/IProductReporsitory";
import IProduct from "../../domain/Product/IProduct";
import AbstractService from "./AbstractService";

export default class ProductService extends AbstractService {
	constructor(readonly repository: IProductRepository) {
		super(repository);
	}

	public async getListing(): Promise<IProduct[]> {
		const productList = await this.repository.getListing();

		return productList;
	}

	public async getById(id: string): Promise<IProduct | void> {
		if (!id) {
			this.setError({message: 'Id is a required field'});
		}

		try {
			return await this.repository.getById(id);
		} catch (error: any) {
			this.setError({message: error.message});
		}
	}

	public async store(product: IProduct): Promise<IProduct | void> {
		this.validateFields(product);
		if (this.hasErrors()) {
			return;
		}

		const created = await this.repository.store(product);

		return created;
	}

	public async update(product: IProduct): Promise<void> {
		this.validateFields(product);
		if (this.hasErrors()) {
			return;
		}

		await this.repository.update(product);
	}

	public async delete(id: string): Promise<void> {
		await this.repository.delete(id);
	}

	private validateFields(product: IProduct): void {
		if (!product.name) {
			this.setError({message: 'Name is a required field'});
		}

		if (product.price < 0) {
			this.setError({message: 'Invalid price entered, enter a positive value'});
		}
	}
}