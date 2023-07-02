import express from 'express';
import routes from './routes/main';
import * as core from 'express-serve-static-core';

export default class ApiAdapter {
	constructor(readonly server: core.Express) {
		this.server = server;
	}

	public initialize(): void {
		this.setJsonMiddleware();
		this.setRoutes();
	}

	private setJsonMiddleware(): void {
		this.server.use(express.json());
	}

	private setRoutes(): void {
		this.server.use(routes);
	}
}