import { ProductCategoryController } from './../controllers/ProductCategoryController';
import { Router } from "express";

const productCategoryRoutes = Router();

productCategoryRoutes.post('/product-category', new ProductCategoryController().create)

export default productCategoryRoutes;