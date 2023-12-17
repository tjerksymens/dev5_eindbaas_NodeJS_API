const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
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

//import routes
const shoesRouter = require("./routes/api/v1/shoes");
app.use(express.json());

const usersRouter = require("./routes/api/v1/users");
app.use(express.json());

// use routes
app.use("/api/v1/shoes", shoesRouter);
app.use("/api/v1/users", usersRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
