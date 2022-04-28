import { Router } from 'express';
import {  getAllProducts,getSingleProduct, createProduct } from '../controllers/Products.js';

const ProductsRouter = Router();

ProductsRouter.route('/').get(getAllProducts).post(createProduct);
ProductsRouter.route('/:id').get(getSingleProduct);


export default ProductsRouter;