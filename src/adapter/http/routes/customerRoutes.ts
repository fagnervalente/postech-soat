import { Router } from "express";
import HttpUtils from '../HttpUtils';
import fetch from 'node-fetch';

const customerRoutes = HttpUtils.asyncRouterHandler(Router());
const userEndpoint = process.env.USER_SERVICE_ENDPOINT as string;
const requestInit = {
    method: 'GET',
    headers: {'Content-Type':'application/json'}
};

customerRoutes.get('/customer', async ()=>{
    return await fetch(`${userEndpoint}/customer`, requestInit);
});

customerRoutes.get('/customer/:cpf', async (req, _)=>{
    const {cpf} = req.params;
    return await fetch(`${userEndpoint}/customer/${cpf}`, {
        ...requestInit,
        body: JSON.stringify(req.body)
    });
});

customerRoutes.post('/customer', async (req, _)=>{
    return await fetch(`${userEndpoint}/customer`, {
        ...requestInit,
        method: 'POST',
        body: JSON.stringify(req.body)
    });
});

customerRoutes.delete('/customer/:id', async (req, _)=>{
    const {id} = req.params;
    return await fetch(`${userEndpoint}/customer/${id}`, {
        ...requestInit,
        method: 'DELETE'
    });
});

export default customerRoutes;