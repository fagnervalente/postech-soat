import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import HttpUtils from "../HttpUtils";

const productRouter =  HttpUtils.asyncRouterHandler(Router());

productRouter.get('/product/category/:categoryId', new ProductController().getByCategory);
productRouter.get('/product/:id', new ProductController().getById);
productRouter.post('/product/:categoryId', new ProductController().create);
productRouter.put('/product/:id', new ProductController().update);
productRouter.delete('/product/:id', new ProductController().delete);

export default productRouter;
