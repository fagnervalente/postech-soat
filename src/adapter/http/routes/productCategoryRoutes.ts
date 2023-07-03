import { ProductCategoryController } from './../controllers/ProductCategoryController';
import { Router } from "express";
import { handleRequest } from '../Utils';

const productCategoryRoutes = Router();

productCategoryRoutes.post('/product-category', handleRequest(new ProductCategoryController().create))

export default productCategoryRoutes;