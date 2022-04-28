import { Router } from 'express';
import {  getAllProducts,getSingleProduct, createProduct, updateProduct, deleteProduct } from '../controllers/Products.js';

const ProductsRouter = Router();

ProductsRouter.route('/').get(getAllProducts).post(createProduct);
ProductsRouter.route('/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct);


export default ProductsRouter;