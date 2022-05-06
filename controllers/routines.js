import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getRoutinesForUser = asyncHandler(async(req,res,next) => {
    console.log(query);
    const routines = await routines.find(query).populate("Products");
    res.json(routines);
});


export const createRoutineForUser = asyncHandler(async(req,res,next) => {

})