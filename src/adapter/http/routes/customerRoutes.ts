import { handleRequest } from '../Utils';
import { CustomerController } from '../controllers/CustomerController';
import { Router } from "express";

const customerRoutes = Router();

customerRoutes.get('/customer/:cpf', handleRequest(new CustomerController().getCustomerByCPF));
customerRoutes.post('/customer', handleRequest(new CustomerController().create));

export default customerRoutes;