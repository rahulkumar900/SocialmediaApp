const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
var { expressjwt } = require("express-jwt");
const { result } = require("lodash");
const { defaultConfiguration } = require("../main/app");
const config = require("../config");
// Signin Controller

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status("401").json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match" });
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

// Signout controller

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Signed out" });
};

// check if require sign in

const requireSignin = expressjwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// check user is authorized to perform update detete and update action
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User not authorized",
    });
  }
  next();
};

module.exports = { signin, signout, requireSignin, hasAuthorization };
