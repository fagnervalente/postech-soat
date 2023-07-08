import { CustomerController } from '../controllers/CustomerController';
import { Router } from "express";

const customerRoutes = Router();

customerRoutes.get('/customer', new CustomerController().list);
customerRoutes.get('/customer/:cpf', new CustomerController().getCustomerByCPF);
customerRoutes.post('/customer', new CustomerController().create);
customerRoutes.delete('/customer/:id', new CustomerController().delete);

export default customerRoutes;