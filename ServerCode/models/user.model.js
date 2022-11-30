const mongoose = require("mongoose");
const crypto = require("node:crypto");
// User Schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: "Email is required",
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,

  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
});

// The password string that's provided by user is not stored directly in the user document . instead it is handled as a virtual field .

// Create a Virtual password field

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function (password) {
    return this._password;
  });

// // Create Encryptpassword and authntication method

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  makeSalt: function () {
    return crypto.randomBytes(128).toString("hex");
  },
};

// // Password field validation

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

module.exports = mongoose.model("User", UserSchema);
