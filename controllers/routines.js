import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get a list of all the routines from one user

export const getRoutinesForUser = asyncHandler(async (req, res, next) => {
  try {
    const {
      params: { userId },
      user,
    } = req;
    if (user._id.toString() !== userId)
      throw new Error("Authorization token invalid");
    const { routines } = await User.findById(userId)
      .select("routines")
      .populate({
        path: "routines",
        populate: {
          path: "products",
          model: "Product",
        },
      });
    res.send(routines);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// Create a new routine

export const createRoutineForUser = asyncHandler(async (req, res, next) => {
  try {
    const {
      body: { name, products },
      params: { userId },
      user,
    } = req;
    if (user._id.toString() !== userId)
      throw new Error("Authorization token invalid");
    const { routines } = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { routines: { name, products } } },
      { new: true }
    )
      .select("routines")
      .populate({
        path: "routines",
        populate: {
          path: "products",
          model: "Product",
        },
      });
    res.send(routines);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// Edit a routine (add a product/delete a product)

export const updateRoutine = asyncHandler(async (req, res) => {
  try {
    const {
      body: { name, products },
      params: { userId, routineId },
      user,
    } = req;
    if (user._id.toString() !== userId)
      throw new Error("Authorization token invalid");
    console.log(products);
    const { acknowledged } = await User.updateOne(
      { _id: userId, "routines._id": routineId },
      { $set: { "routines.$.name": name, "routines.$.products": products } },
      { new: true }
    );

    if (acknowledged) {
      const { routines } = await User.findById(userId)
        .select("routines")
        .populate({
          path: "routines",
          populate: {
            path: "products",
            model: "Product",
          },
        });
      res.json(routines);
    } else {
      res.send(`Routine with id of ${routineId} doesnt exist`);
    }
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
});

// Delete a routine by ID

export const deleteRoutine = asyncHandler(async (req, res) => {
  try {
    const {
      params: { userId, routineId },
      user,
    } = req;
    if (user._id.toString() !== userId)
      throw new Error("Authorization token invalid");

    const { routines } = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { routines: { _id: routineId } } },
      { new: true }
    ).select("routines");

    if (!routines.length)
      return res.status(404).json({ error: "Routine not found..." });

    res.json({ success: `Routine with id of ${routineId} was deleted` });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
});
