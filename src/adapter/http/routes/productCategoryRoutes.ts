import { ProductCategoryController } from './../controllers/ProductCategoryController';
import { Router } from "express";
import HttpUtils from "../HttpUtils";

const productCategoryRoutes = HttpUtils.asyncRouterHandler(Router());

productCategoryRoutes.get('/category', new ProductCategoryController().list);
productCategoryRoutes.get('/category/:id', new ProductCategoryController().getById);
productCategoryRoutes.post('/category', new ProductCategoryController().create);
productCategoryRoutes.put('/category/:id', new ProductCategoryController().update);
productCategoryRoutes.delete('/category/:id', new ProductCategoryController().delete);

export default productCategoryRoutes;