import Article from "../models/article.model.js";
import User from "../models/user.model.js";

export const checkOwner = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.owner);
    const artickle = await Article.findById(req.params.id);
    if (!user._id.equals(artickle.owner)) {
      return res.status(400).send(`user isn't an owner of this artickle`);
    }
    next();
  } catch (err) {
    next(err);
  }
};
