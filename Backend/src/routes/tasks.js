import { Router } from "express";
import * as TasksController from "../controllers/TasksController.js";
import AuthMiddleware from "../middleware/authenticated.js";
const router = Router();

router.get("/tasks", [AuthMiddleware], TasksController.getAllTasks);
router.put("/tasks/:id", [AuthMiddleware], TasksController.setTaskCompleted);
router.get(
  "/tasks-completed",
  [AuthMiddleware],
  TasksController.getAllTasksCompleted
);
router.post("/tasks", [AuthMiddleware], TasksController.createTasks);
router.get(
  "/done-tasks",
  [AuthMiddleware],
  TasksController.countAllTasksCompleted
);
router.get(
  "/pending-tasks",
  [AuthMiddleware],
  TasksController.countAllPendingTasks
);
router.get(
  "/late-tasks",
  [AuthMiddleware],
  TasksController.countAllLateTasks
);

export default router;
