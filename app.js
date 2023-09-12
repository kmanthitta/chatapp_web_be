const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bodyParser = require("body-parser");

const register = require("./routes/register");
const chat = require("./routes/chat").router;
const find = require("./routes/find");
const login = require("./routes/login");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/register", register);

app.use("/login", login);

app.use("/chat", chat);

app.use("/find", find);

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

mongoose
  .connect(
    "mongodb+srv://karthik2manthitta:8OC9gSscCbj5L0KW@cluster0.2igbz24.mongodb.net/"
  )
  .then((res) => {
    console.log("db connected");
    const server = app.listen(8080);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client connected");
    });
  })
  .catch((e) => console.log(e));
