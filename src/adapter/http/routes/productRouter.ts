import { Router } from "express";
import HttpUtils from "../HttpUtils";
import fetch from "node-fetch";

const productRouter = HttpUtils.asyncRouterHandler(Router());
const productEndpoint = process.env.PRODUCT_SERVICE_ENDPOINT as string;
const requestInit = {
    method: 'GET',
    headers: {'Content-Type':'application/json'}
};

productRouter.get('/product/category/:categoryId', async (req, _)=>{
    const {categoryId} = req.params;
    return await fetch(`${productEndpoint}/product/category/${categoryId}`, requestInit);
});

productRouter.get('/product/:id', async (req, _)=>{
    const {id} = req.params;
    return await fetch(`${productEndpoint}/product/${id}`, requestInit);
});

productRouter.post('/product/:categoryId', async (req, _)=>{
    return await fetch(`${productEndpoint}/product`, {
        ...requestInit,
        method: 'POST',
        body: JSON.stringify(req.body)
    });
});

productRouter.put('/product/:id', async (req, _)=>{
    const {id} = req.params;
    return await fetch(`${productEndpoint}/product/${id}`, {
        ...requestInit,
        method: 'PUT',
        body: JSON.stringify(req.body)
    });
});

productRouter.delete('/product/:id', async (req, _)=>{
    const {id} = req.params;
    return await fetch(`${productEndpoint}/product/${id}`, {
        ...requestInit,
        method: 'DELETE'
    });
});

export default productRouter;
