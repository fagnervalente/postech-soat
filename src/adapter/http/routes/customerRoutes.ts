import 'dotenv/config';
import { AuthLambdaIntegration, Customer } from "src/adapter/auth/AuthLambdaIntegration";
import { Router } from "express";
import HttpUtils from '../HttpUtils';
import got from "got";

const customerRoutes = HttpUtils.asyncRouterHandler(Router());
const CUSTOMER_SERVICE_ENDPOINT = process.env.CUSTOMER_SERVICE_ENDPOINT as string;

customerRoutes.get('/customer', async (_, res) => {
	const response = await got.get(CUSTOMER_SERVICE_ENDPOINT);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

customerRoutes.get('/customer/:cpf', async (req, res) => {
	const { cpf } = req.params;
	const response = await got.get(`${CUSTOMER_SERVICE_ENDPOINT}/${cpf}`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

customerRoutes.post('/customer', async (req, res) => {
	const response = await got.post(CUSTOMER_SERVICE_ENDPOINT, { json: req.body });
	const authIntegration = new AuthLambdaIntegration();
	await authIntegration.putClient(JSON.parse(response.body) as Customer);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

customerRoutes.delete('/customer/:id', async (req, res) => {
	const { id } = req.params;
	const response = await got.delete(`${CUSTOMER_SERVICE_ENDPOINT}/${id}`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

export default customerRoutes;