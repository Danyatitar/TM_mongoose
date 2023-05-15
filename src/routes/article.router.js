import { Router } from "express";
import { validateUser, validateArtickle } from "../middleware/exists.mdware.js";
import { checkOwner } from "../middleware/checkOwner.mdware.js";
import {
  createArticle,
  updateArticleById,
  deleteArticleById,
  getArticles,
  getArticleByTitle,
} from "../controllers/article.controller.js";

const articleRouter = Router();

articleRouter
  .get("/", getArticles)
  .get("/:title", getArticleByTitle)
  .post("/", createArticle)
  .put("/:id", [validateUser, validateArtickle, checkOwner], updateArticleById)
  .delete(
    "/:id",
    [validateUser, validateArtickle, checkOwner],
    deleteArticleById
  );

export default articleRouter;
