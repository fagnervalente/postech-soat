import { Router } from "express";
import HttpUtils from "../HttpUtils";
import OrderAPIController from "../controllers/OrderAPIController";
import auth from "../../auth/authMiddleware";
import fetch from "node-fetch";

const orderRoutes = HttpUtils.asyncRouterHandler(Router());
const orderEndpoint = process.env.ORDER_SERVICE_ENDPOINT as string;

orderRoutes.get('/order', async () => {
	const response = await fetch(`${orderEndpoint}/order`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response;
});

orderRoutes.post('/order/checkout', auth, async (req, _) => {
	const response = await fetch(`${orderEndpoint}/order/checkout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body)
	});
	return response;
});

orderRoutes.get('/order/payment/:id', async (req, _) => {
	const id = Number(req.params.id)
	const response = await fetch(`${orderEndpoint}/order/payment/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response;
});

orderRoutes.put('/order/status/:id', async (req, _) => {
	const id = Number(req.params.id)
	const response = await fetch(`${orderEndpoint}/order/status/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body)
	});
	return response;
});

export default orderRoutes;