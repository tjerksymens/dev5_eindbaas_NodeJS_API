const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();
const port = 3000;
const pasport = require("./passport/passport");

// enable cors
const cors = require("cors");
app.use(cors());

// connect to mongodb
mongoose.connect(process.env.MONGODB);

console.log(process.env.MONGODB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// import routes
const shoesRouter = require("./routes/api/v1/shoes");
const usersRouter = require("./routes/api/v1/users");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// use routes
app.use("/api/v1/shoes", shoesRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;