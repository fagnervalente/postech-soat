import { ProductCategoryController } from './../controllers/ProductCategoryController';
import { Router } from "express";
import { handleRequest } from '../Utils';

const productCategoryRoutes = Router();

productCategoryRoutes.post('/category', handleRequest(new ProductCategoryController().create));
productCategoryRoutes.get('/category/:id', handleRequest(new ProductCategoryController().getById));
productCategoryRoutes.get('/category/', handleRequest(new ProductCategoryController().list));
productCategoryRoutes.put('/category/:id', handleRequest(new ProductCategoryController().update));
productCategoryRoutes.delete('/category/:id', handleRequest(new ProductCategoryController().delete));

export default productCategoryRoutes;