import { Router } from "express";
import OrderController from '../controllers/OrderController';

const orderRoutes = Router();

orderRoutes.get('/order', new OrderController().list);
orderRoutes.post('/order/checkout', new OrderController().checkout);

export default orderRoutes;