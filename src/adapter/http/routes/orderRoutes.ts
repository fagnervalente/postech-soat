import { Router } from "express";
import OrderController from '../controllers/OrderController';
import HttpUtils from "../HttpUtils";
import OrderAPIController from "../api/OrderAPIController";

const orderRoutes = HttpUtils.asyncRouterHandler(Router());

orderRoutes.get('/order', new OrderAPIController().list);
orderRoutes.post('/order/checkout', new OrderAPIController().checkout);
orderRoutes.get('/order/payment/:id', new OrderAPIController().getPaymentStatus);

orderRoutes.post('/order/payment/:id', new OrderAPIController().handlePaymentWebhook);

export default orderRoutes;