const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 3000;

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

// use routes
app.use("/api/v1/shoes", shoesRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
