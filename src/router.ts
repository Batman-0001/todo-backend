import { Router } from "express";
import { body } from "express-validator";
import inputErrorHandler from "./handlers/inputErrorHandler";
import { deleteUser, getUser, updateUser } from "./handlers/user";
import {
  createTask,
  deleteTask,
  getTasks,
  getTasksByDate,
  getTasksByStatus,
  getTasksForARange,
  updateTask,
} from "./handlers/task";

const router = Router();

//for user
router.get("/profile", getUser);
router.put(
  "/profile",
  body("username").trim().notEmpty().isString(),
  inputErrorHandler,
  updateUser
);
router.delete("/profile", deleteUser);

//for tasks
router.get("/tasks", getTasks);
router.get("/task/:date", getTasksByDate);
router.get("/task", getTasksForARange);
router.get("/task/:status", getTasksByStatus); //to filter tasks by their status
router.post(
  "/task",
  body("title").trim().notEmpty().isString(),
  body("description").optional().isString(),
  body("scheduleDate").optional().isISO8601().toDate(),
  inputErrorHandler,
  createTask
);
router.put(
  "/task/:id",
  body("title").optional().trim().notEmpty().isString(),
  body("description").optional().isString(),
  body("scheduledDate").optional().isISO8601().toDate(),
  body("status").isIn(["TO_DO", "IN_PROGRESS", "COMPLETED"]),
  inputErrorHandler,
  updateTask
);
router.delete("/task/:id", deleteTask);

//error handler
router.use((err, req, res, next) => {
  res.status(500).json({ message: "server error!" });
});

export default router;
