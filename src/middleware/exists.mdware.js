import Article from "../models/article.model.js";
import User from "../models/user.model.js";

export const validateUserQuery = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .send(`user with id: ${req.params.id} doesn't exist`);
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const validateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.owner);
    if (!user) {
      return res
        .status(404)
        .send(`user with id: ${req.body.owner} doesn't exist`);
    }
    next();
  } catch (err) {
    next(err);
  }
};
export const validateArtickle = async (req, res, next) => {
  try {
    const artickle = await Article.findById(req.params.id);
    console.log(artickle);
    if (!artickle) {
      return res
        .status(404)
        .send(`artickle with id: ${req.params.id} doesn't exist`);
    }
    next();
  } catch (err) {
    next(err);
  }
};
