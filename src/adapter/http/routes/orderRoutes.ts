import { Router } from "express";
import OrderController from '../controllers/OrderController';
import HttpUtils from "../HttpUtils";

const orderRoutes = HttpUtils.asyncRouterHandler(Router());

orderRoutes.get('/order', new OrderController().list);
orderRoutes.post('/order/checkout', new OrderController().checkout);

export default orderRoutes;