import { Router } from 'express';
import {  getAllIngredients, createIngredient, getSingleIngredient, updateIngredient, deleteIngredient } from '../controllers/ingredients.js';

const ingredientsRouter = Router();

ingredientsRouter.route('/').get(getAllIngredients).post(createIngredient);
ingredientsRouter.route('/:id').get(getSingleIngredient).put(updateIngredient).delete(deleteIngredient);


export default ingredientsRouter;