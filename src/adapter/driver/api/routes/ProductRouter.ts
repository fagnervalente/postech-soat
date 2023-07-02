import { Router } from "express";
import ProductController from "../controllers/ProductController";

const ProductRouter = Router();

ProductRouter.get('/products', ProductController.getListing.bind(ProductController));
ProductRouter.get('/products/:id', ProductController.getById.bind(ProductController));
ProductRouter.post('/products', ProductController.store.bind(ProductController));
ProductRouter.put('/products/:id', ProductController.update.bind(ProductController));
ProductRouter.delete('/products/:id', ProductController.delete.bind(ProductController));

export default ProductRouter;