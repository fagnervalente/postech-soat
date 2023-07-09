import { NextFunction, Request, Response } from "express";

/**
 * Executa método da controller e
 * em caso de falha, erro é capturado pelo error handler do adapter (HttpAdapter::setErrorHandler)
 */
export const handleRequest = (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await controller(req, res);
	} catch (error) {
		return next(error);
	}
}