import { Router } from "express";
import HttpUtils from "../HttpUtils";
import auth from "../../auth/authMiddleware";
import got from "got";

const orderRoutes = HttpUtils.asyncRouterHandler(Router());
const orderEndpoint = process.env.ORDER_SERVICE_ENDPOINT as string;

orderRoutes.get('/order', async (_, res) => {
	const response = await got.get(orderEndpoint);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

orderRoutes.post('/order/checkout', auth, async (req, res) => {
	const response = await got.post(`${orderEndpoint}/checkout`, { json: req.body });
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

orderRoutes.get('/order/payment/:id', async (req, res) => {
	const response = await got.get(`${orderEndpoint}/payment/${req.params.id}`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

orderRoutes.put('/order/status/:id', async (req, res) => {
	const response = await got.put(`${orderEndpoint}/status/${req.params.id}`, { json: req.body });
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

orderRoutes.put('/order/paymentStatus/:id', async (req, res) => {
	const response = await got.put(`${orderEndpoint}/paymentStatus/${req.params.id}`, { json: req.body });
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

export default orderRoutes;