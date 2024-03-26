import 'dotenv/config';
import { Router } from "express";
import HttpUtils from "../HttpUtils";
import auth from "../../auth/authMiddleware";
import got from "got";

const orderRoutes = HttpUtils.asyncRouterHandler(Router());
const ORDER_SERVICE_ENDPOINT = process.env.ORDER_SERVICE_ENDPOINT as string;
const PAYMENT_SERVICE_ENDPOINT = process.env.PAYMENT_SERVICE_ENDPOINT as string;
const PROCESS_SERVICE_ENDPOINT = process.env.PROCESS_SERVICE_ENDPOINT as string;

orderRoutes.get('/order', async (_, res) => {
	const response = await got.get(ORDER_SERVICE_ENDPOINT);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

orderRoutes.get('/order/:id', async (req, res) => {
	const response = await got.get(`${ORDER_SERVICE_ENDPOINT}/${req.params.id}`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

orderRoutes.post('/order/checkout', auth, async (req, res) => {
	const response = await got.post(`${ORDER_SERVICE_ENDPOINT}/checkout`, { json: req.body });
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

orderRoutes.post('/order/payment/:id', async (req, res) => {
	const response = await got.post(`${PAYMENT_SERVICE_ENDPOINT}/webhook/${req.params.id}`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

orderRoutes.get('/order/status', async (req, res) => {
	const response = await got.get(`${PROCESS_SERVICE_ENDPOINT}`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

orderRoutes.put('/order/status/:id', async (req, res) => {
	const response = await got.put(`${PROCESS_SERVICE_ENDPOINT}/status/${req.params.id}`, { json: req.body });
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

export default orderRoutes;