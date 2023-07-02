import "reflect-metadata";
import express from 'express';
import * as core from 'express-serve-static-core';
import ApiAdapter from './adapter/driver/api/ApiAdapter';
import { AppDataSource } from "../data-source";


export default class App {
	private server: core.Express = express();

	public async initializeAdapters(): Promise<void> {
		try {
			await this.initDrivenAdapters();
			await this.initDriverAdapters();
		} catch (error) {
			console.log(error);
		}
	}

	public getServer(): core.Express {
		return this.server;
	}

	private initDriverAdapters(): void {
		new ApiAdapter(this.server).initialize();
	}

	private async initDrivenAdapters(): Promise<void> {
		await AppDataSource.initialize();
	}
}