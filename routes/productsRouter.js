<<<<<<< HEAD
import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Products.js";

const ProductsRouter = Router();

ProductsRouter.route("/").get(getAllProducts).post(createProduct);
ProductsRouter.route("/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);
=======
import { Router } from 'express';
import {  getAllProducts,getSingleProduct, createProduct } from '../controllers/Products.js';

const ProductsRouter = Router();

ProductsRouter.route('/').get(getAllProducts).post(createProduct);
ProductsRouter.route('/:id').get(getSingleProduct);
>>>>>>> 1c6835ffc5c6e9385178a1a300b45db2c6037e8c

export default ProductsRouter;
