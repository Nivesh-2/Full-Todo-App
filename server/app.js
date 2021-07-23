require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const DB_URL =
  "mongodb+srv://Nivesh:m23T0N7D3iouwfgb@cluster0.y3svk.mongodb.net/Todos?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const todosRouter = require("./routes/todos");
const userRouter = require("./routes/user");

app.use("/user", userRouter);
app.use("/todos", authentication, todosRouter);

function authentication(req, res, next) {
  const authHeader = req.headers["authentication"];
  console.log("Auth Header " + authHeader);
  if (typeof authHeader === "undefined") {
    res.sendStatus(401);
    return;
  }
  const token = authHeader.split(" ")[1];
  console.log(token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    console.log(user);

    req.user = user;
    // res.sendStatus(201);
    next();
  });
}

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    app.listen(PORT, () => {
      console.log("Server Started at port " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
