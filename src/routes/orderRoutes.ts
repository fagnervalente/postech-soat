import { Router } from "express";
import OrderController from '../controllers/OrderController';

const orderRoutes = Router();
const orderController = new OrderController();

// orderRoutes.get('/order', orderController.getOrders);
orderRoutes.post('/order/checkout', orderController.checkout);

export default orderRoutes;