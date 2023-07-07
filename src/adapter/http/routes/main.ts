import productRouter from "./productRouter";
import customerRoutes from "./customerRoutes";
import productCategoryRoutes from "./productCategoryRoutes";
import orderRoutes from "./orderRoutes";
import healthCheckRoutes from "./healthCheckRouter";

const routes = [
	productRouter,
	customerRoutes,
	productCategoryRoutes,
	orderRoutes,
	healthCheckRoutes
];

export default routes;
