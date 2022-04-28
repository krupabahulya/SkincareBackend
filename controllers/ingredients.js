import asyncHandler from "../utils/asyncHandler";
import ingredient from "../models/ingredient";

export const getAllIngredients = asyncHandler(async(req,res,next) => res.send('GET All'));

export const getSingleIngredient = asyncHandler(async(req,res,next) => res.send('GET single'));

export const createIngredient = asyncHandler(async(req,res,next) => res.send('POST'));