import { Router, Request, Response } from "express";

const healthCheckRoutes = Router();

type HealthCheckResponse = {
  uptime: number;
  message: string | any;
	timestamp: number
};

healthCheckRoutes.get('/', async (req: Request, res: Response) => {
	
	const healthcheck: HealthCheckResponse = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};

	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}
});

export default healthCheckRoutes;