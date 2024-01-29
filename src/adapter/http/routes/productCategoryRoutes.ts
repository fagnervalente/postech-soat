import { Router } from "express";
import HttpUtils from "../HttpUtils";
import fetch from 'node-fetch';

const productCategoryRoutes = HttpUtils.asyncRouterHandler(Router());
const productEndpoint = process.env.PRODUCT_SERVICE_ENDPOINT as string;
const requestInit = {
    method: 'GET',
    headers: {'Content-Type':'application/json'}
};

productCategoryRoutes.get('/category', async ()=>{
    return await fetch(`${productEndpoint}/category`, requestInit);
});

productCategoryRoutes.get('/category/:id', async (req, _)=>{
    const {id} = req.params;
    return await fetch(`${productEndpoint}/category/${id}`, requestInit);
});

productCategoryRoutes.post('/category', async (req, _)=>{
    return await fetch(`${productEndpoint}/category`, {
        ...requestInit,
        method: 'POST',
        body: JSON.stringify(req.body)
    });
});

productCategoryRoutes.put('/category/:id', async (req, _)=>{
    const {id} = req.params;
    return await fetch(`${productEndpoint}/category/${id}`, {
        ...requestInit,
        method: 'PUT',
        body: JSON.stringify(req.body)
    });
});

productCategoryRoutes.delete('/category/:id', async (req, _)=>{
    const {id} = req.params;
    return await fetch(`${productEndpoint}/category/${id}`, {
        ...requestInit,
        method: 'DELETE'
    });
});

export default productCategoryRoutes;