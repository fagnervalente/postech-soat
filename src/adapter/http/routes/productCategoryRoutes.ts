import ProductCategoryAPIController  from '../controllers/ProductCategoryAPIController';
import { Router } from "express";
import HttpUtils from "../HttpUtils";

const productCategoryRoutes = HttpUtils.asyncRouterHandler(Router());

productCategoryRoutes.get('/category', new ProductCategoryAPIController().list);
productCategoryRoutes.get('/category/:id', new ProductCategoryAPIController().getById);
productCategoryRoutes.post('/category', new ProductCategoryAPIController().create);
productCategoryRoutes.put('/category/:id', new ProductCategoryAPIController().update);
productCategoryRoutes.delete('/category/:id', new ProductCategoryAPIController().delete);

export default productCategoryRoutes;