

export type errorName = 'ValidationError';

export interface IError {
	name: errorName,
	message: string
}

export class ValidationError {
	public static create(error: any): IError {
		return {
			name: 'ValidationError',
			message: error.message || 'An error occurred'
		} as IError;
	}
}