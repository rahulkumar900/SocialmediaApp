const app = require("./app");
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected!"));

mongoose.set("strictQuery", true);
const database = mongoose.connection;

database.on("err", () => console.log("connection Error"));
database.once("open", () => console.log("database connected successfully"));
app.listen(port, () =>
  console.log(`app is listening at port http://localhost:${port}`)
);
