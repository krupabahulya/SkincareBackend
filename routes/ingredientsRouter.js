import { Router } from 'express';
import {  getAllIngredients, createIngredient, getSingleIngredient } from '../controllers/ingredients.js';

const ingredientsRouter = Router();

ingredientsRouter.route('/').get(getAllIngredients).post(createIngredient);
ingredientsRouter.route('/:id').get(getSingleIngredient);


export default ingredientsRouter;