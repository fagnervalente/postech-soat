import { Router } from "express";
import HttpUtils from "../HttpUtils";
import got from "got";

const productCategoryRoutes = HttpUtils.asyncRouterHandler(Router());
const productEndpoint = process.env.PRODUCT_SERVICE_ENDPOINT as string;

productCategoryRoutes.get('/category', async (_, res) => {
	const response = await got.get(`${productEndpoint}/category`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

productCategoryRoutes.get('/category/:id', async (req, res) => {
	const { id } = req.params;
	const response = await got.get(`${productEndpoint}/category/${id}`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

productCategoryRoutes.post('/category', async (req, res) => {
	const response = await got.post(`${productEndpoint}/category`, { json: req.body });
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

productCategoryRoutes.put('/category/:id', async (req, res) => {
	const { id } = req.params;
	const response = await got.put(`${productEndpoint}/category/${id}`, { json: req.body });
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

productCategoryRoutes.delete('/category/:id', async (req, res) => {
	const { id } = req.params;
	const response = await got.delete(`${productEndpoint}/category/${id}`);
	return res.status(response.statusCode).json(JSON.parse(response.body));
});

export default productCategoryRoutes;