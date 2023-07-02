import { Router } from "express";
import { ProductController } from '../controllers/ProductController';

const productRoutes = Router();

productRoutes.get('/product/category/:categoryId', new ProductController().getByCategory);
productRoutes.post('/product/:categoryId', new ProductController().create);

export default productRoutes;