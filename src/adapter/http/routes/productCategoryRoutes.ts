import { Router } from "express";
import HttpUtils from "../HttpUtils";
import got from "got";

const productCategoryRoutes = HttpUtils.asyncRouterHandler(Router());
const PRODUCT_SERVICE_ENDPOINT = process.env.PRODUCT_SERVICE_ENDPOINT as string;

productCategoryRoutes.get('/category', async (_, res) => {
	const response = await got.get(`${PRODUCT_SERVICE_ENDPOINT}/category`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

productCategoryRoutes.get('/category/:id', async (req, res) => {
	const { id } = req.params;
	const response = await got.get(`${PRODUCT_SERVICE_ENDPOINT}/category/${id}`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

productCategoryRoutes.post('/category', async (req, res) => {
	const response = await got.post(`${PRODUCT_SERVICE_ENDPOINT}/category`, { json: req.body });
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

productCategoryRoutes.put('/category/:id', async (req, res) => {
	const { id } = req.params;
	const response = await got.put(`${PRODUCT_SERVICE_ENDPOINT}/category/${id}`, { json: req.body });
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

productCategoryRoutes.delete('/category/:id', async (req, res) => {
	const { id } = req.params;
	const response = await got.delete(`${PRODUCT_SERVICE_ENDPOINT}/category/${id}`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

export default productCategoryRoutes;