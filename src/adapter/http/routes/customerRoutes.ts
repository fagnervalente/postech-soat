import { handleRequest } from '../Utils';
import { CustomerController } from '../controllers/CustomerController';
import { Router } from "express";

import { validateSchema } from './schema/helper';
import createUserBody from './schema/validation/createUserBody';

const customerRoutes = Router();

customerRoutes.get('/customer/:cpf', handleRequest(new CustomerController().getCustomerByCPF));
customerRoutes.post('/customer', validateSchema(createUserBody), handleRequest(new CustomerController().create));

export default customerRoutes;