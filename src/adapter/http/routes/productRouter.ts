import { Router } from "express";
import HttpUtils from "../HttpUtils";
import ProductAPIController from "../controllers/ProductAPIController";

const productRouter = HttpUtils.asyncRouterHandler(Router());

productRouter.get('/product/category/:categoryId', new ProductAPIController().getByCategory);
productRouter.get('/product/:id', new ProductAPIController().getById);
productRouter.post('/product/:categoryId', new ProductAPIController().create);
productRouter.put('/product/:id', new ProductAPIController().update);
productRouter.delete('/product/:id', new ProductAPIController().delete);

export default productRouter;
