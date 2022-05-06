import { Router } from "express";
import {} from "../controllers/routines.js";

const rotuinesRouter = Router();

rotuinesRouter
  .route("/user/:userId/routines")
  .get(getRoutinesForUser)
  .post(createRoutineForUser);

rotuinesRouter
  .route("/user/:userId/routines/:routineId")
  .put(updateRoutine)
  .delete(deleteRoutine);

export default rotuinesRouter;
