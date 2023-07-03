import { Router } from "express";
import OrderController from '../controllers/OrderController';
import { handleRequest } from '../Utils';

const orderRoutes = Router();
const orderController = new OrderController();

// orderRoutes.get('/order', orderController.getOrders);
orderRoutes.get('/order', handleRequest(orderController.list));
orderRoutes.post('/order/checkout', handleRequest(orderController.checkout));

export default orderRoutes;