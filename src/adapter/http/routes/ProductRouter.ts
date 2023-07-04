import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { handleRequest } from "../Utils";

const productRouter = Router();

productRouter.get('/product/category/:categoryId', handleRequest(new ProductController().getByCategory));
productRouter.post('/product/:categoryId', handleRequest(new ProductController().create));

export default productRouter;