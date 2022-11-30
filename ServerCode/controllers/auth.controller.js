const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const expressJwt = require("expressJwt");
const { result } = require("lodash");
const { defaultConfiguration } = require("../main/app");
const jwtSecret =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.GHqKl - DlA9t2sN6rA03iOrCLmKUjB6mBtxy2am3qIBA";
// Signin Controller

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status("401").json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match" });
    }
    const token = jwt.sign({ _id: user._id }, jwtSecret);
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

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
});

// check user is authorized to perform update detete and update action
const hasAuthorization = (req, res) => {};

module.exports = { signin, signout, requireSignin, hasAuthorization };
