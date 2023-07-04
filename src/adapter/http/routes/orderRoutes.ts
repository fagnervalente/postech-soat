import { Router } from "express";
import OrderController from '../controllers/OrderController';
import { handleRequest } from '../Utils';

import { validateSchema } from "./schema/helper";
import createOrderBody from "./schema/validation/createOrderBody";

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.get('/order', handleRequest(orderController.list));
orderRoutes.post('/order/checkout', validateSchema(createOrderBody), handleRequest(orderController.checkout));

export default orderRoutes;