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
    const routine = await User.findById(userId)
      .select("routines")
      .populate({
        path: "routines",
        populate: {
          path: "products",
          model: "Product",
        },
      });
    res.send(routine);
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
    const routines = await User.findOneAndUpdate(
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

export default router;
