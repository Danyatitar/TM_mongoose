import mongoose from "mongoose";
import Article from "../models/article.model.js";
import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    let users;
    if (req.query.sort) {
      users = await User.find(
        {},
        { fullName: true, age: true, email: true }
      ).sort({ age: 1 });
    } else {
      users = await User.find({}, { fullName: true, age: true, email: true });
    }

    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserByIdWithArticles = async (req, res, next) => {
  try {
    const articles = await Article.find(
      { owner: req.params.id },
      { title: true, createdAt: true, subtitle: true, _id: false }
    );
    const user = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          age: 1,
          fullName: 1,
          email: 1,
          role: 1,
          numberOfArticles: 1,
          createdAt: 1,
          updatedAt: 1,
          articles: articles,
        },
      },
    ]);

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
      },
      { new: true }
    );

    res.send("User updated");
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    await Article.deleteMany({
      owner: new mongoose.Types.ObjectId(req.params.id),
    });
    await User.findByIdAndDelete(req.params.id);

    res.send("User and his articles were deleted");
  } catch (err) {
    next(err);
  }
};
