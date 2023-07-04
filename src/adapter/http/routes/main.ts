import productRouter from "./productRouter";
import customerRoutes from "./customerRoutes";
import productCategoryRoutes from "./productCategoryRoutes";
import orderRoutes from "./orderRoutes";

const routes = [
	productRouter,
	customerRoutes,
	productCategoryRoutes,
	orderRoutes
];

export default routes;
