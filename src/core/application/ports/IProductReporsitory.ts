import IProduct from "../../domain/Product/IProduct";

export default interface IProductRepository {
	getById(id: string): Promise<IProduct>;
	getListing(): Promise<IProduct[]>;
	store(product: IProduct): Promise<IProduct>;
	update(product: IProduct): Promise<void>;
	delete(id: string): Promise<void>;
}