if (process.env.NODE_ENV !== "production") {
  require("dotenv").parse().json();
}
// require("dotenv").config();

const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));

const mongoose = require("mongoose");

mongoose.connect(
  process.env.CONNECTIONSTRING,
  { useNewUrlParser: true },
  { strictQuery: true }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Dataabse"));

app.use("/", indexRouter);
app.listen(process.env.PORT || 3000);

// app.use(express.json());

// const usersRoute = require("./routes/users");
// app.use("/users", usersRoute);

// app.listen(3000, () => console.log("Server Started"));
