import IProduct from "./IProduct";

export default class Product implements IProduct {
	public id: string = '';
	public name: string = '';
	public price: number = 0;

	public getName(): string {
		return this.name;
	}

	public setName(value: string) {
		this.name = value;
	}

	public getPrice(): number {
		return this.price;
	}

	public setPrice(value: number) {
		this.price = value;
	}

	public getId(): string {
		return this.id;
	}

	public setId(value: string) {
		this.id = value;
	}
}