import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { handleRequest } from "../Utils";

const productRouter = Router();

productRouter.get('/product/category/:categoryId', handleRequest(new ProductController().getByCategory));
productRouter.post('/product/:categoryId', handleRequest(new ProductController().create));
productRouter.get('/product/:id', handleRequest(new ProductController().getById));
productRouter.put('/product/:id', handleRequest(new ProductController().update));
productRouter.delete('/product/:id', handleRequest(new ProductController().delete));

export default productRouter;
