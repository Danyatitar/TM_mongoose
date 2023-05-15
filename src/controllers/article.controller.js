import Article from "../models/article.model.js";
import User from "../models/user.model.js";

export const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find()
      .skip((parseInt(req.query.page) - 1) * parseInt(req.query.limit))
      .limit(parseInt(req.query.limit))
      .populate("owner", "fullName email age-_id");
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

export const getArticleByTitle = async (req, res, next) => {
  try {
    const articles = await Article.find({ title: req.params.title }).populate(
      "owner",
      "fullName email age-_id"
    );
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const artickle = await Article.create(req.body);

    await User.findByIdAndUpdate(artickle.owner, {
      $inc: { numberOfArticles: 1 },
    });

    res.json(artickle);
  } catch (err) {
    next(err);
  }
};

export const updateArticleById = async (req, res, next) => {
  try {
    const artickle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        title,
        subtitle,
        description,
        category,
      },
      { runValidators: true },
      { new: true }
    );
    artickle.save();
    res.send("Artickle updated");
  } catch (err) {
    next(err);
  }
};

export const deleteArticleById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.owner, {
      $inc: { numberOfArticles: -1 },
    });
    await Article.findByIdAndDelete(req.params.id);

    user.save();
    res.send("Artickle deleted");
  } catch (err) {
    next(err);
  }
};
