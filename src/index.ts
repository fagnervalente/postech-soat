import express from "express";
import { AppDataSource } from "./data-source";
import productCategoryRoutes from "./routes/productCategoryRoutes";
import customerRoutes from "./routes/customerRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());

  app.use(customerRoutes);
  app.use(productCategoryRoutes);
  app.use(productRoutes);
  app.use(orderRoutes);

  return app.listen(process.env.SERVER_PORT, () => console.log("Server is Running"));
});
