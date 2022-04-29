import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from '../utils/ErrorResponse.js';
import Ingredient from "../models/Ingredient.js";


export const getAllIngredients = asyncHandler(async(req,res,next) => {
    console.log(req.query);
    const ingredients = await Ingredient.find(req.query);
    res.json(ingredients);
});

export const getSingleIngredient = asyncHandler(async (req, res) => {
  const {
    params: { id }
  } = req;
  const ingredient = await Ingredient.findById(id);
  if (!ingredient) throw new ErrorResponse(`Ingredient with id of ${id} doesn't exist`, 404);
  res.send(ingredient);
});

export const createIngredient = asyncHandler(async(req,res,next) => {
    const { body } = req;
    const newIngredient = await Ingredient.create(body);
    res.status(201).json(newIngredient);
});

export const updateIngredient = asyncHandler(async (req, res) => {
  const {
    body,
    params: { id }
  } = req;
  const updatedIngredient = await Ingredient.findOneAndUpdate({ _id: id }, body, { new: true });
  if (!updatedIngredient) throw new ErrorResponse(`Ingredient with id of ${id} doesn't exist`, 404);
  res.json(updatedIngredient);
});

export const deleteIngredient = asyncHandler(async (req, res) => {
  const {
    params: { id }
  } = req;
  const deleted = await Ingredient.findByIdAndDelete(id);
  if (!deleted) throw new ErrorResponse(`Ingredient with id of ${id} doesn't exist`, 404);
  res.json({ success: `Ingredient with id of ${id} was deleted` });
});