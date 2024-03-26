import 'dotenv/config';
import { Router } from "express";
import HttpUtils from "../HttpUtils";
import got from "got";

const productRouter = HttpUtils.asyncRouterHandler(Router());
const PRODUCT_SERVICE_ENDPOINT = process.env.PRODUCT_SERVICE_ENDPOINT as string;

productRouter.get('/product/category/:categoryId', async (req, res) => {
	const { categoryId } = req.params;
	const response = await got.get(`${PRODUCT_SERVICE_ENDPOINT}/product/category/${categoryId}`);
	return res.status(response.statusCode).json(response.body);
});

productRouter.get('/product/:id', async (req, res) => {
	const { id } = req.params;
	const response = await got.get(`${PRODUCT_SERVICE_ENDPOINT}/product/${id}`);
	return res.status(response.statusCode).json(response.body);
});

productRouter.post('/product/:categoryId', async (req, res) => {
	const { categoryId } = req.params;
	const response = await got.post(`${PRODUCT_SERVICE_ENDPOINT}/product/${categoryId}`, { json: req.body });
	return res.status(response.statusCode).json(response.body);
});

productRouter.put('/product/:id', async (req, res) => {
	const { id } = req.params;
	const response = await got.put(`${PRODUCT_SERVICE_ENDPOINT}/product/${id}`, { json: req.body });
	return res.status(response.statusCode).json(response.body);
});

productRouter.delete('/product/:id', async (req, res) => {
	const { id } = req.params;
	const response = await got.delete(`${PRODUCT_SERVICE_ENDPOINT}/product/${id}`);
	return res.status(response.statusCode).json(response.body);
});

export default productRouter;
