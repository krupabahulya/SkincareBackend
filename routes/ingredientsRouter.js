import { Router } from 'express';
import {  getAllIngredients,getSingleIngredient, createIngredient, updateIngredient, deleteIngredient } from '../controllers/Ingredients.js';

const IngredientsRouter = Router();

IngredientsRouter.route('/').get(getAllIngredients).post(createIngredient);
IngredientsRouter.route('/:id').get(getSingleIngredient).put(updateIngredient).delete(deleteIngredient);


export default IngredientsRouter;