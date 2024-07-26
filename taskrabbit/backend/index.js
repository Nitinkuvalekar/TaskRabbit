const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// middleware
app.use(cors());
app.use(bodyparser.json());

const port = process.env.PORT || 5000;

// mongo connection
try {
  mongoose.connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "TaskRabbit",
  });
} catch (error) {
  console.log(error);
}

// api routes
const userRoute = require("./routes/userRoutes");
app.use("/api", userRoute);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
