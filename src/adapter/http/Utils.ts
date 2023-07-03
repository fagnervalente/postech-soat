import { NextFunction, Request, Response } from "express";

/**
 * Tenta executar método da controler informada,
 * Em caso de falha, transmite erro para handle error middleware (HttpAdapter::setHandleErrorsMiddlewares)
 */
export const handleRequest = (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await controller(req, res);
	} catch (error) {
		return next(error);
	}
}