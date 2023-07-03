import express, { NextFunction, Request, Response, Router } from 'express';
import routes from './routes/main';
import * as core from 'express-serve-static-core';

export default class HttpAdapter {
	constructor(readonly server: core.Express) {
		this.server = server;
	}

	public initialize(): void {
		this.setJsonMiddleware();
		this.setRoutes();
		this.setHandleErrorsMiddlewares();
	}

	private setJsonMiddleware(): void {
		this.server.use(express.json());
	}

	private setHandleErrorsMiddlewares(): void {
		this.server.use((err: any, req: Request, res: Response, next: NextFunction) => {
			return res.status(500).json({
				type: 'InternalError',
				message: err.message || 'An internal error occurred',
				// stack: err.stack
			});
		});
	}

	private setRoutes(): void {
		this.server.use(routes);
	}
}