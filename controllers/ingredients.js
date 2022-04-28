import asyncHandler from "../utils/asyncHandler.js";
import Ingredient from "../models/Ingredient.js";


export const getAllIngredients = asyncHandler(async(req,res,next) => {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
});



export const createIngredient = asyncHandler(async(req,res,next) => {
    const { body } = req;
    const newIngredient = await Ingredient.create(body);
    res.status(201).json(newIngredient);
});