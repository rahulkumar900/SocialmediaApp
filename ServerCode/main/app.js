const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const compress = require("compression");
const app = express();
const userRoutes = require("../routes/user.routes");
const authRoutes = require("../routes/auth.routes");
//-------------  Adding middlewares -------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());

var whitelist = [
  "http://localhost:3000",
  "http://localhost:5173" /** other domains if any */,
];
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// ------------------------------------------------------------ //

// Use User Routes //

app.use("/", userRoutes);
app.use("/", authRoutes);
module.exports = app;
