import { handleRequest } from '../Utils';
import { CustomerController } from '../controllers/CustomerController';
import { Router } from "express";

const customerRoutes = Router();

customerRoutes.get('/customer', handleRequest(new CustomerController().list));
customerRoutes.get('/customer/:cpf', handleRequest(new CustomerController().getCustomerByCPF));
customerRoutes.post('/customer', handleRequest(new CustomerController().create));
customerRoutes.delete('/customer/:id', handleRequest(new CustomerController().delete));

export default customerRoutes;