import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { handleRequest } from "../Utils";

const ProductRouter = Router();

ProductRouter.get('/product/category/:categoryId', handleRequest(new ProductController().getByCategory));
ProductRouter.post('/product/:categoryId', handleRequest(new ProductController().create));

export default ProductRouter;