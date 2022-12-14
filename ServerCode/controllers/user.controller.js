const User = require("../models/user.model");
var { extend } = require("lodash");

// create controllers for the Routes
//    - create
//    - list
//    - read
//    - update
//    - delete
//////////////////////////////////////

// Create a new user
const create = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    return res.status(200).json({
      message: "User successfully created",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// List all users
const list = async (req, res) => {
  try {
    let users = await User.find().select(
      "name email hashed_password updated created"
    );
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);

    if (!user) return res.status(404).json({ error: "User not found" });

    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: "could not retrive user" });
  }
};

const read = async (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    return res.json(deletedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { create, list, read, update, remove, userById };
