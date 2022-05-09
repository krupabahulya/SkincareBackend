import { Router } from "express";
import {
  getRoutinesForUser,
  createRoutineForUser,
  updateRoutine,
  deleteRoutine,
} from "../controllers/routines.js";
import verifyToken from "../middlewares/verifyToken.js";

const routinesRouter = Router();

routinesRouter
  .route("/user/:userId/routines")
  .get(verifyToken, getRoutinesForUser)
  .post(verifyToken, createRoutineForUser);

routinesRouter
  .route("/user/:userId/routines/:routineId")
  .put(verifyToken, updateRoutine)
  .delete(verifyToken, deleteRoutine);

export default routinesRouter;
