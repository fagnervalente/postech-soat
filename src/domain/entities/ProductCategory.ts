export class ProductCategory {
	readonly id?: number;
	readonly name: string;

	constructor(id: number | undefined, name: string) {
		if (id) {
			this.id = id;
		}
		this.name = name;
	}
}