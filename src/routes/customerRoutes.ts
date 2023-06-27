import { CustomerController } from '../controllers/CustomerController';
import { Router } from "express";

const customerRoutes = Router();

customerRoutes.get('/customer/:cpf', new CustomerController().getCustomerByCPF);
customerRoutes.post('/customer', new CustomerController().create);

export default customerRoutes;