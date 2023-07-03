

export type errorType = 'ValidationError';

export default interface IError {
	type: errorType,
	message: string
}