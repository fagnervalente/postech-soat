import IError from "../../domain/Error/IError";
import ValidationError from "../../domain/Error/ValidationError";

export default class AbstractUseCase {
	private errors: IError[] = [];

	constructor(readonly repository: any) {
		this.repository = repository;
		this.errors = [];
	}

	public hasErrors(): Boolean {
		return this.errors.length > 0;
	}

	public setError(error: IError): void {
		if (error.type) {
			this.errors.push(error);
			return;
		}

		this.errors.push(ValidationError.create(error));
	}

	public setErrors(errors: IError[]) {
		for (const error of errors) {
			this.setError(error);
		}
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