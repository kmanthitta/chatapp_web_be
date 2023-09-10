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

mongoose
  .connect(
    "mongodb+srv://karthik2manthitta:8OC9gSscCbj5L0KW@cluster0.2igbz24.mongodb.net/"
  )
  .then((res) => console.log("db connected"))
  .catch((e) => console.log(e));

app.use("/register", register);

app.use("/login", login);

app.use("/chat", chat);

app.use("/find", find);

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

const server = app.listen(8080);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.emit("hello", "world");
});
