import { Router } from "express";
import { validateUserQuery } from "../middleware/exists.mdware.js";
import {
  createUser,
  getUsers,
  updateUserById,
  deleteUserById,
  getUserByIdWithArticles,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", validateUserQuery, getUserByIdWithArticles);
userRouter.post("/", createUser);
userRouter.put("/:id", validateUserQuery, updateUserById);
userRouter.delete("/:id", validateUserQuery, deleteUserById);

export default userRouter;
