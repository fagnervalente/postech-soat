import { IError, ValidationError } from "../../domain/Error/Error";

export default class AbstractService {
	private errors: IError[] = [];

	constructor(readonly repository: any) {
		this.repository = repository;
		this.errors = [];
	}

	public hasErrors(): Boolean {
		return this.errors.length > 0;
	}

	public setError(error: any): void {
		this.errors.push(ValidationError.create(error));
	}

	public clearErrors(): void {
		this.errors = [];
	}

	public getErrors(): IError[] {
		const errors = this.errors;
		this.clearErrors();

		return errors;
	}
}