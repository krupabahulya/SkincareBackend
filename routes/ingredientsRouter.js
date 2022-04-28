import { Router } from 'express';
import {  getAllIngredients, createIngredient } from '../controllers/ingredients.js';

const ingredientsRouter = Router();

ingredientsRouter.route('/').get(getAllIngredients).post(createIngredient);


export default ingredientsRouter;