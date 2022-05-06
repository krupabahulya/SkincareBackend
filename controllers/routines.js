import express from "express";
import User from "../models/User.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Get a list of all the routines from one user

router.get("/user/:userId/routines", verifyToken, async (req, res) => {
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

router.post("/user/:userId/routines", verifyToken, async (req, res) => {
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
// NOT WORKING YET!!!

router.put(
  "/user/:userId/routines/:routineId",
  verifyToken,
  async (req, res) => {
    try {
      const {
        body: { name, products },
        params: { userId },
        user,
      } = req;
      if (user._id.toString() !== userId)
        throw new Error("Authorization token invalid");

      const { routines } = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { routines: { name, products } } },
        { new: true }.select("routines")
      );

      if (!routines.length)
        return res.status(404).json({ error: "Routine not found..." });

      res.json(routines);
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error.message);
    }
  }
);

// Delete a routine by ID

router.delete(
  "/user/:userId/routines/:routineId",
  verifyToken,
  async (req, res) => {
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

      res.json({ success: "aio" });
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error.message);
    }
  }
);

export default router;
