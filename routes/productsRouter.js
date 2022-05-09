import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Products.js";

const ProductsRouter = Router();

ProductsRouter.route("/").get(getAllProducts).post(createProduct);

ProductsRouter.route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default ProductsRouter;
