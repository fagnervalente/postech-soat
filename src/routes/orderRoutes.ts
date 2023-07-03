import { Router } from "express";
import OrderController from '../controllers/OrderController';

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.get('/order', orderController.list);
orderRoutes.post('/order/checkout', orderController.checkout);

export default orderRoutes;